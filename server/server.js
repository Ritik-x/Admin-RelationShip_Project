import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/", (req, res) => {
  res.send(`server is running on ${port}`);
});
