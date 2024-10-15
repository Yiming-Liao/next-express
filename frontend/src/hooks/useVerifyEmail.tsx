import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios

export const useVerifyEmail = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const verifyEmail = async (verifyEmailToken: string | null) => {
    const response = await axios.post("/auth/verify-email", {
      verifyEmailToken,
    });

    return response;
  };

  return { verifyEmail };
};
