// backend/core/services/verifyJwtToken.ts

import jwt from "jsonwebtoken";
import HttpError from "@/HttpError.ts";

// @changePassword @resetPassword @verifyEmail @authMiddleware
export default function verifyJwtToken(token: string, secret: string) {
  try {
    // 解碼 token 並取得 user 資料
    const user = jwt.verify(token, secret) as {
      email: string;
      username?: string;
      isEmailVerified?: boolean;
    };

    // 檢查 email 是否存在
    if (!user.email) {
      throw new HttpError("Email 不存在於 token 中", 400);
    }

    return user;
  } catch (err) {
    console.log("\x1b[36m%s\x1b[0m", err.message); // 輸出藍色的字
    // 根據不同的錯誤類型處理
    if (err instanceof jwt.JsonWebTokenError) {
      // 錯誤的 token
      throw new HttpError("無效的 Token", 401);
    } else if (err instanceof jwt.TokenExpiredError) {
      // Token 已過期
      throw new HttpError("Token 已過期", 401);
    }

    // 其他錯誤
    throw new HttpError("驗證失敗", 500);
  }
}
