"use client";

import { useToast } from "@/contexts/ToastContext";
import { createContext, useContext, ReactNode } from "react";
import Axios, { AxiosInstance, AxiosResponse, isAxiosError } from "axios";

// 創建 Axios 上下文
const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

export const AxiosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast(); // 在這裡使用 useToast

  const axios: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  // 回應攔截器
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      toast({ type: "success", message: response.data.message }); // 使用 toast 顯示成功訊息
      return response;
    },
    (error: unknown) => {
      if (isAxiosError(error)) {
        const { response } = error;

        if (response) {
          toast({ type: "error", message: response.data.message }); // 使用 toast 顯示錯誤訊息
        } else {
          toast({ type: "error", message: "網絡錯誤或請求未到達伺服器" }); // 使用 toast 顯示錯誤訊息
        }
      } else {
        console.warn("發生未知錯誤: ", error);
      }
    }
  );

  return (
    <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
  );
};

// 自定義 Hook 用於使用 Axios
export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return context;
};
