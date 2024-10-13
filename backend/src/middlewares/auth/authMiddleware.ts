import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth.ts";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 從 cookie 中獲取 token
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      status: "error",
      message: "✖️ Token 不存在",
    });
  }

  // 驗證JWT
  jwt.verify(token, authConfig.JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(401).json({
        status: "error",
        message: "✖️ Token 無效",
      });
    }

    req.user = user;
    next();
  });
};
