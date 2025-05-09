import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthContextType {
  user: {
    firstName?: string;    // Make optional to match User type
    lastName?: string;     // Make optional to match User type
    email: string;        // Keep required since it's likely always present
    role?: string;        // Already optional
    googleId?: string
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
