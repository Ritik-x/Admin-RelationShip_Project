// seed.js
import "dotenv/config";
import connectDB from "./config/db.js";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";
import Agent from "./models/agent.model.js";

async function seed() {
  try {
    await connectDB(); // Fixed: connectDB doesn't need MONGO_URI parameter
    console.log("Seeding DB...");

    // clear existing data
    await User.deleteMany({});
    await Agent.deleteMany({});

    // Create admin user
    const adminPass = await bcrypt.hash("admin123", 10); // Fixed: use 10 rounds directly
    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: adminPass,
      role: "admin",
    });
    console.log("Admin created: admin@example.com / admin123");

    // Create 5 agents
    for (let i = 1; i <= 5; i++) {
      const agentPass = await bcrypt.hash("agent123", 10); // Fixed: use 10 rounds directly
      await Agent.create({
        name: `Agent ${i}`,
        email: `agent${i}@example.com`,
        mobile: `+91900000000${i}`,
        password: agentPass,
      });
    }
    console.log(
      "5 agents created: agent1..agent5@example.com (password: agent123)"
    );

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}
seed();
