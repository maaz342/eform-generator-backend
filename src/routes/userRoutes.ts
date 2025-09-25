import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { getProfile, updateProfile } from "../controllers/userController";

const router = Router();

// /api/users
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
