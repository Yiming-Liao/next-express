import { authConfig } from "@/config/authConfig.ts";
import markEmailAsVerified from "@/database/auth/markEmailAsVerified.ts";
import HttpError from "@/HttpError.ts";
import generateAuthTokenAndSetCookie from "@/services/generateAuthTokenAndSetCookie.ts";
import verifyJwtToken from "@/services/verifyJwtToken.ts";
import { NextFunction, Request, Response } from "express";

export default async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { token } = req.query;

    // 確認 token 存在
    if (!token || typeof token !== "string") {
      throw new HttpError("無效的驗證請求，缺少 token", 400);
    }
    const user = verifyJwtToken(token, authConfig.EMAIL_VERIFICATION_SECRET);

    // 💾 Prisma
    const updatedUser = await markEmailAsVerified(user.email);

    // 清除舊的 cookie
    res.clearCookie(`${authConfig.JWT_TOKEN_NAME}`);

    // 生成 token 和設置 cookie
    generateAuthTokenAndSetCookie(updatedUser, res);

    res.status(200).json({
      status: "success",
      message: "Email 驗證成功。",
    });
  } catch (err) {
    next(err);
  }
}
