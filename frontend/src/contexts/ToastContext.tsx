"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 定義 Toast 的類型
interface Toast {
  type: "success" | "error";
  message: string;
}

// 定義 ToastContext 的類型
interface ToastContextType {
  toast: (toast: Toast) => void;
}

// 創建 ToastContext
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ToastProvider 組件
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 顯示 Toast 的函數
  const toast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1)); // 自動移除最舊的 Toast
    }, 3000); // 3 秒後自動消失
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        {toasts.map((toast, index) => (
          <div
            key={index}
            style={{
              padding: "8px 16px",
              margin: "4px 0",
              borderRadius: "4px",
              backgroundColor: toast.type === "success" ? "green" : "tomato",
              color: "white",
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 自定義 Hook 用於使用 ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
