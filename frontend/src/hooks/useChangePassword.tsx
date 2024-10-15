import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios

export const useChangePassword = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const changePassword = async (
    oldPassword: string,
    password: string,
    confirmPassword: string
  ) => {
    await axios.post("/auth/change-password", {
      oldPassword,
      password,
      confirmPassword,
    });
  };

  return { changePassword };
};
