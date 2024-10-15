// backend/core/src/controllers/auth/logoutController.ts
import clearCookie from "#/services/clearCookie.ts";
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
    clearCookie(req, res);
  }
}
