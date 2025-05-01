import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import type { Request, Response } from "express";

import slideRoutes from "./routes/slideRoutes";
import authRoutes from "./routes/auth.route";
import registerRoutes from "./routes/register.route";
import forgotPasswordRoutes from "./routes/forgot-password.route";
import resetPasswordRoutes from "./routes/reset-password.route";
import changePasswordRoutes from "./routes/change-password.route";
import reviewsRouter from './routes/reviews.route';
import categoryRoutes from "./routes/categories.route";
import { authenticatedUser } from "./lib/lib";

// Импортируем конфигурацию passport
import "./config/passport";

const app = express();
const port = 3001;

// Middleware
app.use(cors({ 
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
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
    name: 'alco-store.sid' // уникальное имя для cookie сессии
  })
);

// Добавляем отладочный middleware для сессий
app.use((req, res, next) => {
  console.log('Session middleware - session:', {
    id: req.sessionID,
    user: req.session?.user,
    cookie: req.session?.cookie
  });
  next();
});

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
