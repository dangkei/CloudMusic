import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  if (!user) {
    return (
      <div className="text-center mt-20 text-white">
        请先{" "}
        <span
          className="text-blue-400 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          登录
        </span>
      </div>
    );
  }

  const handleSave = () => {
    updateUser({ name, avatar });
    alert("已保存！");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 mt-10 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">用户设置</h2>
      <input
        type="text"
        value={name}
        placeholder="用户名"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded text-black mb-3"
      />
      <input
        type="text"
        value={avatar}
        placeholder="头像 URL（可选）"
        onChange={(e) => setAvatar(e.target.value)}
        className="w-full p-2 rounded text-black mb-3"
      />
      {avatar && (
        <img
          src={avatar}
          alt="预览"
          className="w-16 h-16 rounded-full mx-auto mb-3"
        />
      )}
      <button
        onClick={handleSave}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 w-full"
      >
        保存
      </button>
    </div>
  );
}
