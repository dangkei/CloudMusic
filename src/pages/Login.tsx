import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("请输入用户名");
    login({ name, avatar: avatar || undefined });
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold">登录 CloudMusic</h2>
        <input
          type="text"
          placeholder="用户名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="头像链接（可选）"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          登录
        </button>
      </form>
    </div>
  );
}
