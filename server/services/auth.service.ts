import toast from 'react-hot-toast';
import i18next from 'i18next';

class AuthService {
  private static instance: AuthService;
  private isAuthInProgress: boolean = false;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<boolean> {
    if (this.isAuthInProgress) return false;
    
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
        return true;
      } else {
        toast.error(i18next.t(data.message) || i18next.t('auth.somethingWentWrong'));
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(i18next.t('auth.somethingWentWrong'));
      return false;
    } finally {
      this.isAuthInProgress = false;
    }
  }

  public initiateGoogleAuth(): void {
    if (this.isAuthInProgress) return;
    
    this.isAuthInProgress = true;
    window.location.href = 'http://localhost:3001/api/auth/google';
  }
}

export default AuthService.getInstance(); 