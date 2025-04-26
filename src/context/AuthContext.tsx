import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthContextType {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role?: string; // Add the role property (optional if not always present)
  } | null;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoggedIn, loading, logout, refetch } = useAuth();

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
