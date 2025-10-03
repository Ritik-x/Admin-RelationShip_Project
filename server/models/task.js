import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    default: "",
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Agent
    ref: "Agent",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
