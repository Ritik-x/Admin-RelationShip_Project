import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multerConfig.js";
import { uploadndDistribute } from "../controllers/upload.controller.js";

const urouter = express.Router();

urouter.post("/", authMiddleware, upload.single("file"), uploadndDistribute);

export default urouter;
