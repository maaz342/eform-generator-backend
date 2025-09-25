import { Request, Response } from "express";
import User from "../models/User";

// 📌 Get All Users
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

// 📌 Create User (Admin Invite)
export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, isAdmin } = req.body;
  const user = await User.create({ firstName, lastName, email, isAdmin });
  res.json(user);
};

// 📌 Update User
export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

// 📌 Delete User
export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
};
