import { Request, Response, NextFunction } from "express";
import { authConfig } from "!/config/authConfig.ts";
import TokenService from "#/services/TokenService.ts";
import CookieService from "#/services/CookieService.ts";

export default class AuthMiddleware {
  // 已通過信箱驗證
  static verifiedUser(req: Request, res: Response, next: NextFunction): void {
    try {
      // 取得 authToken
      const authToken = CookieService.getCookie(
        req,
        authConfig.AUTH_TOKEN_NAME
      );

      // 驗證 authToken 並取得 user 資料
      const user = TokenService.verifyJwtToken(
        authToken,
        authConfig.AUTH_SECRET
      );

      // 驗證 email
      if (!user.isEmailVerified) {
        res.status(403).json({
          status: "error",
          message: "尚未驗證電子郵件",
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

  // 尚未通過信箱驗證
  static unverifiedUser(req: Request, res: Response, next: NextFunction): void {
    try {
      // 取得 authToken
      const authToken = CookieService.getCookie(
        req,
        authConfig.AUTH_TOKEN_NAME
      );

      // 驗證 authToken 並取得 user 資料
      const user = TokenService.verifyJwtToken(
        authToken,
        authConfig.AUTH_SECRET
      );

      // ✔️ 通過 => 前往要訪問的路由
      req.user = user; // 將使用者信息附加到 req 對象
      next();
    } catch (err) {
      next(err);
    }
  }
}
