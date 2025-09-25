import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport"; // ✅ your Google OAuth config
import connectDb from "./config/db";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
connectDb();

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend.vercel.app"], // whitelist
    credentials: true,
  })
);
app.options("*", cors());

// ✅ JSON body parsing
app.use(express.json());

// ✅ Session middleware (must come before passport.session())
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // https only in prod
      httpOnly: true,
      sameSite: "none", // required for cross-site cookies
    },
  })
);

// ✅ Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Health check (good for Vercel deployments)
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully");
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
