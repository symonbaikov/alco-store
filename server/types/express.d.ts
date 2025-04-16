import { Request, Response } from "express";
import session from 'express-session';

export { Request, Response };

declare module 'express-session' {
    interface SessionData {
      user?: {
        id: string;
      };
    }
  }