import type { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      email: string;
    };
  }
}

export function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const user = req.session?.user;
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
