// backend/core/src/controllers/auth/LoginController.ts
import { Request, Response } from "express";
import validateInput from "#/validators/validateInput.ts";
import { loginSchema } from "#/validators/auth/loginSchema.ts";
import UserDbHandler from "#/database/UserDbHandler.ts";
import verifyPassword from "#/services/auth/verifyPassword.ts";
import CookieService from "#/services/CookieService.ts";
import TokenService from "#/services/TokenService.ts";
import { authConfig } from "!/config/authConfig.ts";

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
    const user = await UserDbHandler.findUser(email);
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
   * 刷新 authToken 並設置至 cookie
   * @param {any} user - 用戶資料
   * @param {Request} req - Express 請求物件
   * @param {Response} res - Express 回應物件
   */
  protected async renewAuthTokenWithCookie(
    req: Request,
    res: Response,
    user: any
  ): Promise<void> {
    CookieService.clearCookie(req, res);

    const authToken = TokenService.generateJwtToken(
      user,
      authConfig.AUTH_SECRET,
      "1d"
    );

    CookieService.setCookie(res, `${authConfig.AUTH_TOKEN_NAME}`, authToken);
  }
}
