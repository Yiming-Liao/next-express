import jwt from "jsonwebtoken";
import { authConfig } from "@/config/authConfig.ts";
import HttpError from "@/HttpError.ts";

interface TokenPayload {
  email: string;
  username?: string;
  isEmailVerified?: boolean;
}

export enum TokenType {
  VERIFY_EMAIL = "verifyEmail",
  RESET_PASSWORD = "resetPassword",
}

export default class TokenService {
  /**
   * 生成驗證或重設密碼 token
   * @param {TokenType} usage - token 的用途（email 驗證或重設密碼）
   * @param {string} email - 用戶的 email
   * @returns {string} - 返回生成的 token
   */
  static generateVerifyToken(usage: TokenType, email: string): string {
    const secret =
      usage === TokenType.VERIFY_EMAIL
        ? authConfig.EMAIL_VERIFICATION_SECRET
        : authConfig.RESET_PASSWORD_SECRET;

    return jwt.sign({ email }, secret, {
      expiresIn: "1d", // 設置 token 有效期 1 天
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

      if (!user.email) {
        throw new HttpError("Email 不存在於 token 中", 400);
      }

      return user;
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new HttpError("無效的 Token", 401);
      } else if (err instanceof jwt.TokenExpiredError) {
        throw new HttpError("Token 已過期", 401);
      }

      throw new HttpError("驗證失敗", 500);
    }
  }

  /**
   * 生成 authToken
   * @param {TokenPayload} payload - token 中的用戶資料
   * @returns {string} - 返回生成的 authToken
   */
  static generateAuthToken(payload: TokenPayload): string {
    return jwt.sign(payload, authConfig.AUTH_SECRET, {
      expiresIn: "1d", // 1 天有效期
    });
  }
}
