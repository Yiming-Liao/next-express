import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios

export const useForgotPassword = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const forgotPassword = async (email: string) => {
    await axios.post("/auth/forgot-password", { email });
  };

  return { forgotPassword };
};
