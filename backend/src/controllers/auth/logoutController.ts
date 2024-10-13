import { NextFunction, Request, Response } from "express";

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 清除 token 的 cookie
    res.clearCookie("token", {
      httpOnly: true, // 這樣 cookie 不會被 JavaScript 存取
      secure: process.env.NODE_ENV === "production", // 僅在生產環境使用 HTTPS
      path: "/", // 設定 cookie 的路徑
    });

    res.json({
      status: "success",
      message: "登出成功！",
    });
  } catch (error) {
    next(error);
  }
};
