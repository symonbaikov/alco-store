import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import slideRoutes from "./routes/slideRoutes.ts";
import authRoutes from "./routes/auth.route.ts";
import registerRoutes from "./routes/register.route.ts";
import forgotPasswordRoutes from "./routes/forgot-password.route.ts";
import resetPasswordRoutes from "./routes/reset-password.route.ts";
import { authenticatedUser } from "./lib/lib.ts";

const app = express();
const port = 3001;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "super_secret_key", // Вынеси в .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 дней
      secure: true, // если будешь юзать HTTPS — поставь true
    },
  })
);

// Public route
app.get("/", (req, res) => {
  res.send("API is up");
});

// Protected route
app.get("/profile", authenticatedUser, (req, res) => {
  res.json({ user: req.session.user }); // 🔥 теперь работает!
});

// Routes
app.use("/api/slides", slideRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/reset-password", resetPasswordRoutes);
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
