import dotenv from "dotenv";

dotenv.config(); // 載入環境變數

export const authConfig = {
  JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : "123456",
};
