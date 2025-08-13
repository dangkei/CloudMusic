import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function LoginPage() {
  const { setUser } = useUser();
  const [name, setName] = useState("");

  const handleLogin = () => {
    const userData = { name };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">登录 CloudMusic</h2>
      <input
        type="text"
        placeholder="输入用户名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded mb-4 text-black"
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        登录
      </button>
    </div>
  );
}
