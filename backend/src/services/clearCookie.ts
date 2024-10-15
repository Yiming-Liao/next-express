import { appConfig } from "@/config/appConfig.ts";
import { authConfig } from "@/config/authConfig.ts";
import { Request, Response } from "express";

export default async function clearCookie(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // 清除指定 cookie
    res.clearCookie(`${authConfig.AUTH_TOKEN_NAME}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 僅在生產環境使用 HTTPS
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
  } catch (err) {
    throw err;
  }
}
