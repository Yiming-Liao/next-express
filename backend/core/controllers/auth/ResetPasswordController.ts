// backend/core/src/controllers/auth/ResetPasswordController.ts
import { Request, Response } from "express";
import { resetPasswordSchema } from "#/validators/auth/resetPasswordSchema.ts";
import validateInput from "#/validators/validateInput.ts";
import UserDbHandler from "#/database/UserDbHandler.ts";
import { authConfig } from "!/config/authConfig.ts";
import TokenService from "#/services/TokenService.ts";
import CookieService from "#/services/CookieService.ts";

/**
 * 重設密碼控制器
 */
export default class ResetPasswordController {
  /**
   * 驗證輸入資料
   * @param {Request} req - Express 請求物件
   */
  protected validate(req: Request): void {
    validateInput(resetPasswordSchema, req);
  }

  /**
   * 驗證 resetPasswordToken
   * @param {Request} req - Express 請求物件
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected verifyJwtToken(req: Request): any {
    const { resetPasswordToken } = req.body;
    const user = TokenService.verifyJwtToken(
      resetPasswordToken,
      authConfig.RESET_PASSWORD_SECRET
    );
    return user;
  }

  /**
   * 更新使用者密碼
   * @param {Request} req - Express 請求物件
   * @param {string} email - 使用者電子郵件
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected async updateUserPassword(
    req: Request,
    email: string
  ): Promise<any> {
    const { password } = req.body;
    const updatedUser = await UserDbHandler.updateUserPassword(email, password);
    return updatedUser;
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
