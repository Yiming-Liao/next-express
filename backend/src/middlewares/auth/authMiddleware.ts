import { Request, Response, NextFunction } from "express";
import { authConfig } from "@/config/authConfig.ts";
import verifyJwtToken from "@/services/verifyJwtToken.ts";
import getauthTokenFromCookie from "@/services/getAuthTokenFromCookie.ts";

export default class AuthMiddleware {
  static handleAuth(
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

      // ✔️ 通過 => 前往要訪問的路由
      req.user = user; // 將使用者信息附加到 req 對象
      next();
    } catch (err) {
      next(err);
    }
  }
}
