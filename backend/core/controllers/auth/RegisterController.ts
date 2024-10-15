// backend/core/src/controllers/auth/LoginController.ts
import { Request, Response } from "express";
import { registerSchema } from "#/validators/auth/registerSchema.ts";
import validateInput from "#/validators/validateInput.ts";
import UserDbHandler from "#/database/UserDbHandler.ts";
import sendVerificationEmail from "#/mails/auth/sendVerificationEmail.ts";
import CookieService from "#/services/CookieService.ts";
import { authConfig } from "!/config/authConfig.ts";
import TokenService from "#/services/TokenService.ts";

/**
 * 註冊控制器
 */
export default class RegisterController {
  /**
   * 驗證輸入資料
   * @param {Request} req - Express 請求物件
   */
  protected validate(req: Request): void {
    validateInput(registerSchema, req);
  }

  /**
   * 建立新用戶
   * @param {Request} req - Express 請求物件
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected async createUser(req: Request): Promise<any> {
    const { username, email, password } = req.body;
    const createdUser = await UserDbHandler.createUser(
      username,
      email,
      password
    );
    return createdUser;
  }

  /**
   * 發送信箱驗證郵件
   * @param {string} email - 使用者電子郵件
   */
  protected async sendResetPasswordEmail(email: string): Promise<void> {
    await sendVerificationEmail(email);
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
    CookieService.clearCookie(req, res);

    const authToken = TokenService.generateJwtToken(
      user.email,
      authConfig.AUTH_SECRET,
      "1d"
    );

    CookieService.setCookie(res, `${authConfig.AUTH_TOKEN_NAME}`, authToken);
  }
}
