import fs from "fs";
import distribute from "../utils/distributetask.js";
import Task from "../models/task.js";
import Agent from "../models/agent.model.js";
import path from "path";
import csv from "csvtojson";

export const uploadndDistribute = async (req, res, next) => {
  let filePath;
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "File is required" });
    const filePath = path.resolve(file.path);

    // Parse CSV to JSON.
    // csvtojson will try to parse CSV; for xlsx you'd normally use 'xlsx' but to keep dependencies small, we support CSV primarily.
    const jsonArray = await csv({ trim: true, checkType: false }).fromFile(
      filePath
    );

    // validate rows and normalize fields
    const normalized = jsonArray.map((row, idx) => {
      const keys = Object.keys(row);
      const lower = {};
      keys.forEach((k) => (lower[k.toLowerCase().trim()] = row[k]));

      const firstName =
        lower["firstname"] ??
        lower["first name"] ??
        lower["first_name"] ??
        lower["name"];
      const phone = lower["phone"] ?? lower["mobile"] ?? lower["ph"];
      const notes = lower["notes"] ?? lower["note"] ?? "";

      if (!firstName || !phone) {
        const error = new Error(
          `Invalid format at row ${idx + 1}. Required: FirstName and Phone.`
        );
        error.statusCode = 400;
        throw error;
      }
      return {
        firstName: String(firstName).trim(),
        phone: String(phone).trim(),
        notes: String(notes).trim(),
      };
    });

    // Fetch 5 agents (assignment requirement)
    const agents = await Agent.find().sort({ createdAt: 1 }).limit(5);
    if (agents.length < 5) {
      const e = new Error(
        `At least 5 agents are required to distribute. Found ${agents.length}`
      );
      e.statusCode = 400;
      throw e;
    }
    const agentIds = agents.map((a) => a._id);

    // Distribute
    const distribution = distribute(normalized, agentIds);

    // Save contacts and set assignedAgent
    const saved = [];
    for (const [agentId, items] of Object.entries(distribution)) {
      for (const it of items) {
        const task = new Task({
          title: it.title,
          phone: it.phone,
          notes: it.notes,
          assignedAgent: agentId,
        });
        await task.save();
        saved.push(task);
      }
    }

    // cleanup temp file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Temp file removal failed", err);
      });
    }

    res.json({
      message: "File processed and distributed",
      total: saved.length,
    });
  } catch (err) {
    // cleanup and forward error
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    next(err);
  }
};
