// backend/core/src/controllers/auth/logoutController.ts
import CookieService from "#/services/CookieService.ts";
import { Request, Response } from "express";

/**
 * 登出控制器
 */
export default class LogoutController {
  /**
   * 清除 cookie
   * @param {Request} req - Express 請求物件
   * @param {Response} res - Express 回應物件
   */
  clearCookie(req: Request, res: Response): void {
    console.log(req);
    CookieService.clearCookie(req, res);
  }
}
