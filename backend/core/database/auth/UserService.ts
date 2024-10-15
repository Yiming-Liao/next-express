import bcrypt from "bcryptjs";
import prisma from "@/database/prismaClient.ts";
import HttpError from "#/HttpError.ts";

export default class UserService {
  /**
   * 創建新的使用者
   * @param {string} username 使用者名稱
   * @param {string} email - 使用者電子郵件
   * @param {string} password 使用者密碼
   * @returns 返回新使用者資料
   */
  static async createUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // 加密密碼
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return createdUser; // ✔️ 返回使用者資料
  }

  /**
   * 查找使用者
   * @param {string} email - 使用者電子郵件
   * @returns 返回使用者資料
   */
  static async findUser(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpError("沒有該筆 email 資料", 404);
    return user; // ✔️ 返回使用者資料
  }

  /**
   * 標記使用者的電子郵件為已驗證
   * @param {string} email - 使用者電子郵件
   * @returns 返回更新後的使用者資料
   */
  static async markEmailAsVerified(email: string) {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isEmailVerified: true },
    });
    return updatedUser; // ✔️ 返回使用者資料
  } // 找不到使用者錯誤 err.code === "P2025"

  /**
   * 更新使用者密碼
   * @param {string} email - 使用者電子郵件
   * @param password 新的密碼
   * @returns 返回更新後的使用者資料
   */
  static async updateUserPassword(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // 加密密碼
    // 更新使用者的密碼
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }, // 更新密碼
    });
    return updatedUser; // ✔️ 返回使用者資料
  }
}
