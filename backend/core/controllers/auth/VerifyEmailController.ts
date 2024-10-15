// backend/core/src/controllers/auth/VerifyEmailController.ts
import { Request, Response } from "express";
import validateInput from "#/validators/validateInput.ts";
import TokenService from "#/services/TokenService.ts";
import UserDbHandler from "#/database/UserDbHandler.ts";
import { authConfig } from "!/config/authConfig.ts";
import { verifyEmailSchema } from "#/validators/auth/verifyEmailSchema.ts";
import sendVerificationEmail from "#/mails/auth/sendVerificationEmail.ts";
import CookieService from "#/services/CookieService.ts";

/**
 * 信箱驗證控制器
 */
export default class VerifyEmailController {
  /**
   * 驗證輸入資料
   * @param {Request} req - Express 請求物件
   */
  protected validate(req: Request): void {
    validateInput(verifyEmailSchema, req);
  }

  /**
   * 驗證 verifyEmailToken
   * @param {Request} req - Express 請求物件
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected verifyJwtToken(req: Request): any {
    const { verifyEmailToken } = req.body;
    const user = TokenService.verifyJwtToken(
      verifyEmailToken,
      authConfig.EMAIL_VERIFICATION_SECRET
    );
    return user;
  }

  /**
   * 更新使用者信箱驗證狀態為已通過
   * @param {string} email - 使用者電子郵件
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected async markEmailAsVerified(email: string): Promise<any> {
    const updatedUser = await UserDbHandler.markEmailAsVerified(email);
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

  /*** 再次發送驗證信 ***/
  /**
   * 查找用戶
   * @param {string} email - 使用者的 Email
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected async findUser(email: string): Promise<any> {
    const user = await UserDbHandler.findUser(email);
    return user;
  }

  /**
   * 發送信箱驗證郵件 [再次發送]
   * @param {string} email - 使用者電子郵件
   */
  protected async sendResetPasswordEmail(email: string): Promise<void> {
    await sendVerificationEmail(email);
  }
}
