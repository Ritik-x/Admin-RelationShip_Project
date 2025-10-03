import express from "express";
import { createAgent, listAgents } from "../controllers/agent.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const arouter = express.Router();

arouter.get("/", authMiddleware, listAgents);
arouter.post("/", authMiddleware, createAgent);

export default arouter;
