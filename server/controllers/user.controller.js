import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user

    const user = await User.modelName.create({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });
    res.cookie("token", token, {});

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id, // ❌ pehle _id likha tha
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "registeration falied",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const jwtSecret = process.env.JWT_SECRET;
    const payload = { id: user._id, role: user.role, email: user.email };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });

    res.cookie("token ", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });
    res.status(200).json({
      message: "user logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const me = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};
