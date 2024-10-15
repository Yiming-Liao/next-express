import { NextFunction, Request, Response } from "express";
import { changePasswordSchema } from "@/validators/auth/changePasswordSchema.ts";
import findUser from "@/database/auth/findUser.ts";
import verifyPassword from "@/services/auth/verifyPassword.ts";
import updateUserPassword from "@/database/auth/updateUserPassword.ts";
import getauthTokenFromCookie from "@/services/getAuthTokenFromCookie.ts";
import verifyJwtToken from "@/services/verifyJwtToken.ts";
import { authConfig } from "@/config/authConfig.ts";
import validateInput from "@/validators/validateInput.ts";

export default async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // JOI 驗證輸入資料
    validateInput(changePasswordSchema, req);

    // 取得 authToken
    const authToken = getauthTokenFromCookie(req);

    // 驗證 authToken 並取得 user 資料
    const user = verifyJwtToken(authToken, authConfig.AUTH_SECRET);

    // 取得前端傳來的資料
    const { oldPassword, password } = req.body;

    // 💾 Prisma
    const foundUser = await findUser(user.email);

    // 驗證密碼 (oldPassword)
    await verifyPassword(oldPassword, foundUser?.password || "");

    // 💾 Prisma  // 更新密碼到資料庫 (password)
    await updateUserPassword(foundUser.email, password);

    res.status(200).json({
      status: "success",
      message: "密碼更改成功。",
    });
  } catch (err) {
    next(err);
  }
}
