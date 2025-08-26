import React, { createContext, useContext, useEffect, useState } from "react";

type AdminUser = { email: string; name?: string };
type AdminAuthContextType = {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("adminUser");
    if (saved) setAdmin(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // 🔐 临时方案：前端校验（后续用后端/JWT替换）
    const allowEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com";
    const allowPass = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
    if (email === allowEmail && password === allowPass) {
      const user = { email, name: "Administrator" };
      setAdmin(user);
      localStorage.setItem("adminUser", JSON.stringify(user));
      return;
    }
    throw new Error("Invalid credentials");
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminUser");
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, isAuthenticated: !!admin, loading, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx)
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};
