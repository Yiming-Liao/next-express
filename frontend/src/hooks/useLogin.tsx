import { useAuth } from "@/contexts/AuthContext";
import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios
import { AxiosError } from "axios";
import { appConfig } from "@/config/appConfig";

export const useLogin = () => {
  const axios = useAxios(); // 獲取 Axios 實例
  const { setUser } = useAuth();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const userData = response.data.userData;

      // 設置 context 用戶狀態
      setUser(userData);

      // 設置 localStorage
      localStorage.setItem(appConfig.APP_NAME, JSON.stringify(userData));

      //錯誤處理
    } catch (err: unknown) {
      if (!(err instanceof AxiosError)) {
        console.warn("發生未知錯誤: ", err);
      }
    }
  };

  return { login };
};
