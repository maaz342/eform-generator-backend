import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";   // ✅ added
import passport from "./config/passport";
 import connectDb from "./config/db"
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
connectDb();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend.vercel.app"], // whitelist frontend
    credentials: true,
  })
);
app.use(express.json());

// ✅ session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // better to load from .env
    resave: false,
    saveUninitialized: true,
  })
);

// ✅ passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
