import jwt from "jsonwebtoken";
import { Response } from "express";
import { authConfig } from "@/config/authConfig.ts";

// @register @login @resetPassword @verifyEmail
export default function generateAuthTokenAndSetCookie(
  user: {
    email: string;
    username: string;
    isEmailVerified: boolean;
  },
  res: Response
) {
  // 生成 token
  const authToken = jwt.sign(
    {
      email: user.email,
      username: user.username,
      isEmailVerified: user.isEmailVerified,
    }, // payload
    authConfig.AUTH_SECRET, // secret
    { expiresIn: "1d" } // options
  );

  // 設置 cookie
  res.cookie(`${authConfig.AUTH_TOKEN_NAME}`, authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 3600000), // 1 小時
    path: "/", // 設定 cookie 的路徑
  });
}
