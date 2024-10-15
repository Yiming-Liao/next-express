import { Request } from "express";
import { authConfig } from "@/config/authConfig.ts";
import HttpError from "@/HttpError.ts";

export default function getAuthTokenFromCookie(req: Request) {
  // 取得 authToken
  const authToken = req.cookies[`${authConfig.AUTH_TOKEN_NAME}`];

  if (!authToken) {
    throw new HttpError("✖️ authToken 不存在", 400);
  }

  return authToken;
}
