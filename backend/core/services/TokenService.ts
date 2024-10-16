import jwt from "jsonwebtoken";
import HttpError from "@/HttpError.ts";
import TokenPayload from "#/types/services/TokenServiceType.ts";

export default class TokenService {
  /**
   * 生成信箱 JWT token
   * @param {string} user - 用戶
   * @param {string} secret - 加密 Secret
   * @param {string} expiresIn - 過期時間
   * @returns {string} - 返回生成的 token
   */
  static generateJwtToken(
    user: any,
    secret: string,
    expiresIn: string
  ): string {
    const { username, email, isEmailVerified } = user;
    return jwt.sign({ username, email, isEmailVerified }, secret, {
      expiresIn: expiresIn,
    });
  }

  /**
   * 驗證 JWT token
   * @param {string} token - 待驗證的 token
   * @param {string} secret - 用於驗證的密鑰
   * @returns {TokenPayload} - 返回解碼後的用戶資料
   */
  static verifyJwtToken(token: string, secret: string): TokenPayload {
    try {
      const user = jwt.verify(token, secret) as TokenPayload;
      if (!user.email) throw new HttpError("Email 不存在於 token 中", 400);
      return user;
      // 錯誤處理
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new HttpError(`[無效的 Token] ${err.message}`, 401);
      } else if (err instanceof jwt.TokenExpiredError) {
        throw new HttpError(`[Token 已過期] ${err.message}`, 401);
      }
      throw new HttpError(`[驗證失敗] ${err.message}`, 500);
    }
  }
}
