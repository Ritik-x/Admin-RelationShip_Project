import mongoose from "mongoose";
const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Regex for country code + 10 digit number, e.g., +919876543210
        return /^\+\d{1,3}\d{10}$/.test(v.replace(/\s/g, ""));
      },
      message: (props) =>
        `${props.value} is not a valid mobile number with country code!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
