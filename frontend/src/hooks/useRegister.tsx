import { useAuth } from "@/contexts/AuthContext";
import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios
import { appConfig } from "@/config/appConfig";

export const useRegister = () => {
  const axios = useAxios(); // 獲取 Axios 實例
  const { setUser } = useAuth();

  const register = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const response = await axios.post("/auth/register", {
      username,
      email,
      password,
      confirmPassword,
    });

    if (response) {
      const userData = response.data.userData;

      // 設置 context 用戶狀態
      setUser(userData);

      // 設置 localStorage
      localStorage.setItem(appConfig.APP_NAME, JSON.stringify(userData));
    }
  };

  return { register };
};
