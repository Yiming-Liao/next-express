// backend/core/src/controllers/auth/ForgotPasswordController.ts
import { Request } from "express";
import { forgotPasswordSchema } from "#/validators/auth/forgotPasswordSchema.ts";
import sendResetPasswordEmail from "#/mails/auth/sendResetPasswordEmail.ts";
import validateInput from "#/validators/validateInput.ts";
import UserService from "#/database/auth/UserService.ts";

/**
 * 忘記密碼控制器
 */
export default class ForgotPasswordController {
  /**
   * 驗證輸入資料
   * @param {Request} req - Express 請求物件
   */
  protected validate(req: Request): void {
    validateInput(forgotPasswordSchema, req);
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
   * 發送重置密碼的郵件
   * @param {string} email - 使用者電子郵件
   */
  protected async sendResetPasswordEmail(email: string): Promise<void> {
    await sendResetPasswordEmail(email);
  }
}
