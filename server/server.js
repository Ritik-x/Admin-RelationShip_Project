import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors";
import router from "./routes/userauth.route.js";
import arouter from "./routes/agent.route.js";
import urouter from "./routes/upload.js";
import cookieParser from "cookie-parser";
import Task from "./models/task.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
connectDB();

const port = process.env.PORT || 5000;

app.use("/user", router);
app.use("/agent", arouter);
app.use("/uploadfile", urouter);

app.get("/api/agent/:agentId/contacts", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedAgent: req.params.agentId }).sort({
      createdAt: 1,
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/", (req, res) => {
  res.send(`server is running on ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
