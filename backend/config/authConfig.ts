import dotenv from "dotenv";

dotenv.config(); // 載入環境變數

export const authConfig = {
  AUTH_SECRET: process.env.AUTH_SECRET || "123456", // 用於 authMiddleware 驗證使用者登入狀態
  AUTH_TOKEN_NAME: process.env.AUTH_TOKEN_NAME || "APP_TOKEN", // 設定 authToken 的名稱
  EMAIL_VERIFICATION_SECRET: process.env.EMAIL_VERIFICATION_SECRET || "123456", // 信箱驗證 secret
  RESET_PASSWORD_SECRET: process.env.RESET_PASSWORD_SECRET || "123456", // 密碼重設 secret
};
