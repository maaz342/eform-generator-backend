import { Request, Response } from "express";
import User from "../models/User";
export const getProfile = async (req: Request & { user?: any }, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 📌 Update Profile
export const updateProfile = async (req: Request & { user?: any }, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ msg: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
