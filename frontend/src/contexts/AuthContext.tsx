"use client";

import { appConfig } from "@/config/appConfig";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useEffect,
} from "react";

// 定義 Context 的類型
interface AuthContextType {
  user: { email: string } | null;
  setUser: Dispatch<SetStateAction<{ email: string } | null>>;
}

// AuthProvider 組件
interface AuthProviderProps {
  children: ReactNode; // 使用 ReactNode 來定義 children 的類型
}

// 創建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  // 使用 useEffect 來從 localStorage 加載用戶資料
  useEffect(() => {
    const storedUser = localStorage.getItem(appConfig.APP_NAME);
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []); // 只在組件掛載時執行一次

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children} {/* 直接返回 children */}
    </AuthContext.Provider>
  );
};

// 自定義 hook，用於訪問 AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
