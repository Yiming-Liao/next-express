// backend/core/services/renewAuthTokenWithCookie.ts

import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { authConfig } from "@/config/authConfig.ts";
import clearCookie from "./clearCookie.ts";

// @register @login @resetPassword @verifyEmail
export default function renewAuthTokenWithCookie(
  req: Request,
  res: Response,
  user: {
    email: string;
    username: string;
    isEmailVerified: boolean;
  }
) {
  // 1. 清理 cookie
  clearCookie(req, res);

  // 2. 生成 authToken
  const authToken = jwt.sign(
    {
      email: user.email,
      username: user.username,
      isEmailVerified: user.isEmailVerified,
    }, // payload
    authConfig.AUTH_SECRET, // secret
    { expiresIn: "1d" } // options
  );

  // 3. 設置 cookie
  res.cookie(`${authConfig.AUTH_TOKEN_NAME}`, authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 3600000), // 1 小時
    path: "/", // 設定 cookie 的路徑
  });
}
