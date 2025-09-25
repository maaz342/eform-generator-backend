import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/adminController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.get("/", protect, adminOnly, getUsers);
router.post("/", protect, adminOnly, createUser);
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
