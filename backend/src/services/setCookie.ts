import { Response } from "express";

export default function setCookie(res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 3600000),
    path: "/", // 設定 cookie 的路徑
  });
}
