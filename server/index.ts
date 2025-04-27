import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import type { Request, Response } from "express";

import slideRoutes from "./routes/slideRoutes.ts";
import authRoutes from "./routes/auth.route.ts";
import registerRoutes from "./routes/register.route.ts";
import forgotPasswordRoutes from "./routes/forgot-password.route.ts";
import resetPasswordRoutes from "./routes/reset-password.route.ts";
import changePasswordRoutes from "./routes/change-password.route.ts";
import reviewsRouter from './routes/reviews.route.ts';
import categoryRoutes from "./routes/categories.route.ts";
import { authenticatedUser } from "./lib/lib.ts";

// Импортируем конфигурацию passport
import "./config/passport.ts";

const app = express();
const port = 3001;

// Middleware
app.use(cors({ 
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "super_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 дней
      secure: false, // в продакшене установить в true
      sameSite: 'lax'
    },
  })
);

// Инициализация Passport
app.use(passport.initialize());
app.use(passport.session());

// Public route
app.get("/", (req, res) => {
  res.send("API is up");
});

// Protected route
app.get("/profile", authenticatedUser, async (req: Request, res: Response): Promise<void> => {
  res.json({ user: req.session.user });
});

// Routes
app.use("/api/slides", slideRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/reset-password", resetPasswordRoutes);
app.use("/api/change-password", changePasswordRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/reviews', reviewsRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
