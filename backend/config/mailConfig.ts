import dotenv from "dotenv";

dotenv.config(); // 載入環境變數

export const mailConfig = {
  MAIL_USERNAME: process.env.MAIL_USERNAME || "user@gmail.com",
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || "123456",
};
