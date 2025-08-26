import React, { useState } from "react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const { login } = useAdminAuth();
  const nav = useNavigate();
  const location = useLocation() as any;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      const to = location.state?.from?.pathname || "/admin";
      nav(to, { replace: true });
    } catch (e: any) {
      setErr(e.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f14]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-[#121821] p-6 rounded-2xl shadow-xl space-y-4"
      >
        <h1 className="text-xl font-semibold text-white">Admin Login</h1>
        {err && <div className="text-red-400 text-sm">{err}</div>}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Email</label>
          <input
            className="w-full rounded-lg bg-[#0e141b] border border-gray-700 p-2 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-lg bg-[#0e141b] border border-gray-700 p-2 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
