import jwt from "jsonwebtoken";
import { authConfig } from "@/config/authConfig.ts";

// @sendResetPasswordEmail @sendVerificationEmail
export default function generateVerifyToken(usage: string, email: string) {
  const secert =
    usage === "verifyEmail"
      ? authConfig.EMAIL_VERIFICATION_SECRET
      : authConfig.RESET_PASSWORD_SECRET;

  // 生成 token
  const token = jwt.sign({ email }, secert, {
    expiresIn: "1d", // 驗證 token 的有效期，設為一天
  });

  return token;
}
