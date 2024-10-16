import { useAuth } from "@/contexts/AuthContext";
import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios
import { appConfig } from "@/config/appConfig";

export const useLogout = () => {
  const axios = useAxios(); // 獲取 Axios 實例
  const { setUser } = useAuth();

  const logout = async () => {
    await axios.post("/auth/logout");

    // 清除 context 用戶狀態
    setUser(null); // 假設 setUser(null) 是用來清除用戶資料的

    // 清除 localStorage 中的用戶資料
    localStorage.removeItem(appConfig.APP_NAME); // 如果你有特定的 key
  };

  return { logout };
};
