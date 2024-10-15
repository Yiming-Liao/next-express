// backend/core/src/controllers/auth/ChangePasswordController.ts
import { Request } from "express";
import validateInput from "#/validators/validateInput.ts";
import { changePasswordSchema } from "#/validators/auth/changePasswordSchema.ts";
import UserDbHandler from "#/database/UserDbHandler.ts";
import verifyPassword from "#/services/auth/verifyPassword.ts";

/**
 * 更改密碼控制器
 */
export default class ChangePasswordController {
  /**
   * 驗證輸入資料
   * @param {Request} req - Express 請求物件
   */
  protected validate(req: Request): void {
    validateInput(changePasswordSchema, req);
  }

  /**
   * 查找用戶
   * @param {string} email - 使用者 Email
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected async findUser(email: string): Promise<any> {
    const user = await UserDbHandler.findUser(email);
    return user;
  }

  /**
   * 驗證密碼
   * @param {string} oldPassword - 用戶輸入的舊密碼
   * @param {string} hashedPassword - 存儲的密碼
   */
  protected async verifyPassword(
    oldPassword: string,
    hashedPassword: string
  ): Promise<void> {
    await verifyPassword(oldPassword, hashedPassword);
  }

  /**
   * 更新使用者密碼
   * @param {string} email - 使用者電子郵件
   * @param {string} password - 使用者密碼
   * @returns {Promise<any>} - 返回用戶資料
   */
  protected async updateUserPassword(
    email: string,
    password: string
  ): Promise<any> {
    const updatedUser = await UserDbHandler.updateUserPassword(email, password);
    return updatedUser;
  }
}
