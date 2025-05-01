import toast from 'react-hot-toast';
import i18next from 'i18next';

class AuthService {
  private static instance: AuthService;
  private isAuthInProgress = false;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string) {
    if (this.isAuthInProgress) return null;
    
    this.isAuthInProgress = true;
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success(i18next.t('auth.success'));
        return data;
      } else {
        toast.error(i18next.t(data.message) || i18next.t('auth.somethingWentWrong'));
        return null;
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(i18next.t('auth.somethingWentWrong'));
      return null;
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async handleGoogleAuthSuccess() {
    if (this.isAuthInProgress) return;
    
    this.isAuthInProgress = true;
    try {
      toast.success(i18next.t('auth.success'));
    } finally {
      this.isAuthInProgress = false;
    }
  }
}

export const authService = AuthService.getInstance(); 