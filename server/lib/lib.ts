import type { Request, Response, NextFunction } from "express";
import { SessionUser } from '../../types/session';

export function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log('Auth middleware - full request:', {
    session: req.session,
    cookies: req.cookies,
    headers: req.headers
  });
  
  if (!req.session || !req.session.user) {
    console.log('Auth middleware - unauthorized: no session or user');
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  console.log('Auth middleware - authorized user:', req.session.user);
  next();
}
