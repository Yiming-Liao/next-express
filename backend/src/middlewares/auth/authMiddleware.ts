import { Request, Response, NextFunction } from "express";
import HttpError from "@/HttpError.ts";
import { authConfig } from "@/config/authConfig.ts";
import verifyJwtToken from "@/services/verifyJwtToken.ts";
import getauthTokenFromCookie from "@/services/getAuthTokenFromCookie.ts";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // 取得 authToken
    const authToken = getauthTokenFromCookie(req);

    // 驗證 authToken 並取得 user 資料
    const user = verifyJwtToken(authToken, authConfig.AUTH_SECRET);

    // 驗證 email
    if (!user.isEmailVerified) {
      res.status(403).json({
        status: "error",
        message: "✖️ 請先驗證您的電子郵件以訪問此頁面。",
      });
      return;
    }

    // ✔️ 通過
    req.user = user; // 將使用者信息附加到 req 對象
    next();
  } catch (err) {
    // 檢查是否是自訂的 HttpError
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
      return;
    }

    // 其他未知錯誤
    res.status(500).json({
      status: "error",
      message: "✖️ 伺服器內部錯誤",
    });
    return;
  }
}
