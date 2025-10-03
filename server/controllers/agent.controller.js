import bcrypt from "bcryptjs";
import Agent from "../models/agent.model.js";

export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if ((!name, !email, !mobile, !password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent email exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await Agent.create({
      name,
      email,
      password,
      hashedPassword,
      mobile,
    });
    await agent.save();
    res.status(201).json({
      message: "Agent created",
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "agent Creation failed",
    });
  }
};
