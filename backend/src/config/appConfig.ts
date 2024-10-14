import dotenv from "dotenv";

dotenv.config(); // 載入環境變數

export const appConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8000,
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8000",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
};
