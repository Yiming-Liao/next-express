import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios

export const useResetPassword = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const resetPassword = async (
    resetPasswordToken: string | null,
    password: string,
    confirmPassword: string
  ) => {
    await axios.post("/auth/reset-password", {
      resetPasswordToken,
      password,
      confirmPassword,
    });
  };

  return { resetPassword };
};
