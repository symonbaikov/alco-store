import { useState, useEffect, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
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
      });
      setUser(null);
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    }
  };
  

  return { user, loading, isLoggedIn: !!user, logout, refetch: fetchProfile };
}
