import type { Request, Response, NextFunction } from "express";

export function authenticatedUser(req: Request, res: Response, next: NextFunction) {
  const user = req.session?.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}