import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  name: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void; // ✅ 新增
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ 初始化：刷新时从本地读取
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("读取用户数据失败", err);
      localStorage.removeItem("user");
    }
  }, []);

  // ✅ 封装登录逻辑
  const login = (userData: User) => {
    const finalUser = {
      avatar: "https://via.placeholder.com/40", // 默认头像
      ...userData,
    };
    setUser(finalUser);
    localStorage.setItem("user", JSON.stringify(finalUser));
  };

  // ✅ 更新用户信息（比如修改头像）
  const updateUser = (newData: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ 退出登录
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, login, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser 必须在 UserProvider 内使用");
  return context;
};
