import Axios, { AxiosInstance } from "axios";

const axios: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  //   withXSRFToken: true,
});

// ↗️ 請求攔截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.warn("[Axios請求] 錯誤: ", error.message);
  }
);

// ↙️ 回應攔截器
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response) {
      // 伺服器回應了狀態碼，但狀態碼不在 2xx 範圍內
      console.warn("[Axios回應] 錯誤: ", response.data.message);
    } else {
      // 網絡錯誤或請求未到達伺服器
      console.warn("網絡錯誤或請求未到達伺服器: ", error.message);
    }
  }
);

export default axios;
