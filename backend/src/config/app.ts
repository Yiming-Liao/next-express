import dotenv from "dotenv";

dotenv.config(); // 載入環境變數

export const serverConfig = {
  PORT: process.env.PORT && 8000,
  NODE_ENV: process.env.NODE_ENV && "development",
};
