import { Request, Response } from "express";
import HttpError from "@/HttpError.ts";
import { authConfig } from "!/config/authConfig.ts";
import { appConfig } from "!/config/appConfig.ts";

/**
 * CookieService 負責處理有關 cookie 的操作，包括設置、獲取和清除 cookie。
 */
class CookieService {
  /**
   * 設置 cookie
   * @param {Response} res - Express 的響應對象。
   * @param {string} name - cookie 的名稱。
   * @param {string} value - cookie 的值。
   * @param {Object} options - 可選的 cookie 配置選項。
   */
  static setCookie(
    res: Response,
    name: string,
    value: string,
    options: {
      httpOnly?: boolean;
      secure?: boolean;
      expires?: Date;
      path?: string;
    } = {}
  ): void {
    res.cookie(name, value, {
      httpOnly: options.httpOnly || true, // 默認為 true
      secure: options.secure || process.env.NODE_ENV === "production", // 僅在生產環境使用 HTTPS
      expires: options.expires || new Date(Date.now() + 3600000), // 默認為 1 小時
      path: options.path || "/", // 默認路徑
    });
  }

  /**
   * 從請求的 cookie 中獲取指定名稱的 cookie 值。
   * @param {Request} req - Express 的請求對象。
   * @param {string} cookieName - 要獲取的 cookie 名稱。
   * @returns {string} - 返回獲取到的 cookie 值。
   * @throws {HttpError} - 如果指定名稱的 cookie 不存在，則拋出錯誤。
   */
  static getCookie(req: Request, cookieName: string): string {
    const cookie = req.cookies[cookieName];
    if (!cookie) throw new HttpError(`[此Cookie不存在: ${cookieName}]`, 400);
    return cookie;
  }

  /**
   * 清除指定的認證 token cookie，並在開發環境下清除所有 cookie。
   * @param {Request} req - Express 的請求對象。
   * @param {Response} res - Express 的響應對象。
   * @returns {Promise<void>} - 返回一個 Promise，表示清除操作的完成。
   */
  static clearCookie(req: Request, res: Response): void {
    // 清除指定 cookie
    res.clearCookie(`${authConfig.AUTH_TOKEN_NAME}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    // 清除所有 cookies  // 開發環境使用
    if (appConfig.NODE_ENV !== "production") {
      const cookies = req.cookies;
      for (const cookieName in cookies) {
        res.clearCookie(cookieName, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
      }
    }
  }
}

export default CookieService;
