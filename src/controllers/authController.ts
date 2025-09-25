import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id: string, isAdmin: boolean) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id.toString(), user.isAdmin),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id.toString(), user.isAdmin),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
