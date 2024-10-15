// backend/core/src/controllers/auth/LoginController.ts
import { Request, Response } from "express";
import { loginSchema } from "#/validators/auth/loginSchema.ts";
import verifyPassword from "#/services/auth/verifyPassword.ts";
import renewAuthTokenWithCookie from "#/services/renewAuthTokenWithCookie.ts";
import validateInput from "#/validators/validateInput.ts";
import UserService from "#/database/auth/UserService.ts";

/**
 * 登入控制器
 */
export default class LoginController {
  /**
   * 驗證輸入資料
   * @param {Request} req - Express 請求物件
   */
  protected validate(req: Request): void {
    validateInput(loginSchema, req);
  }

  /**
   * 查找用戶
   * @param {Request} req - Express 請求物件
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected async findUser(req: Request): Promise<any> {
    const { email } = req.body;
    const user = await UserService.findUser(email);
    return user;
  }

  /**
   * 驗證密碼
   * @param {Request} req - Express 請求物件
   * @param {string} hashedPassword - 存儲的密碼
   */
  protected async verifyPassword(
    req: Request,
    hashedPassword: string
  ): Promise<void> {
    const { password } = req.body;
    await verifyPassword(password, hashedPassword);
  }

  /**
   * 刷新 auth token 並設置至 cookie
   * @param {any} user - 用戶資料
   * @param {Request} req - Express 請求物件
   * @param {Response} res - Express 回應物件
   */
  protected async renewAuthTokenWithCookie(
    req: Request,
    res: Response,
    user: any
  ): Promise<void> {
    renewAuthTokenWithCookie(req, res, user);
  }
}
