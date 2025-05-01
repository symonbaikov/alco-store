import { useState, useEffect, useCallback } from "react";

interface User {
  email: string;
  googleId?: string;
  firstName?: string;
  lastName?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/profile", {
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched user data:', data);
        setUser(data.user);
      } else {
        console.log('Failed to fetch user data:', res.status);
        setUser(null);
      }
    } catch (err) {
      console.error("Ошибка при проверке сессии:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const logout = async () => {
    try {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setUser(null);
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    }
  };
  

  return { user, loading, isLoggedIn: !!user, logout, refetch: fetchProfile };
}
