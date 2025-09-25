import passport from "passport";
import { Router } from "express";
import { register, login } from "../controllers/authController";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: any, res) => {
    const token = jwt.sign(
      { id: req.user._id, isAdmin: req.user.isAdmin },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.redirect(`http://localhost:3000/google-success?token=${token}`);
  }
);

export default router;
