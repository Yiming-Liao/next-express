import { authConfig } from "@/config/authConfig.ts";
import { NextFunction, Request, Response } from "express";

export default async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // 清除指定 cookie
    res.clearCookie(`${authConfig.JWT_TOKEN_NAME}`, {
      httpOnly: true, // 這樣 cookie 不會被 JavaScript 存取
      secure: process.env.NODE_ENV === "production", // 僅在生產環境使用 HTTPS
      path: "/", // 設定 cookie 的路徑
    });

    // 獲取所有 cookies
    const cookies = req.cookies;
    // 清除所有 cookies
    for (const cookieName in cookies) {
      res.clearCookie(cookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/", // 設定 cookie 的路徑
      });
    }

    res.json({
      status: "success",
      message: "登出成功！",
    });
  } catch (err) {
    next(err);
  }
}
