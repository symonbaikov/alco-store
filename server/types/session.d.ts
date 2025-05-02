export interface SessionUser {
  id: string;
  email: string;
  googleId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

declare module 'express-session' {
  interface Session {
    user?: SessionUser;
  }
} 