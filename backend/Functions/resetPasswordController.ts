import { authConfig } from "@/config/authConfig.ts";
import updateUserPassword from "@/database/auth/updateUserPassword.ts";
import generateAuthTokenAndSetCookie from "@/services/generateAuthTokenAndSetCookie.ts";
import verifyJwtToken from "@/services/verifyJwtToken.ts";
import { resetPasswordSchema } from "@/validators/auth/resetPasswordSchema.ts";
import validateInput from "@/validators/validateInput.ts";
import { NextFunction, Request, Response } from "express";

export default async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // JOI 驗證輸入資料
    validateInput(resetPasswordSchema, req);

    const { resetPasswordToken, password } = req.body;

    // 取得 jwt token 中的 user 資料
    const user = verifyJwtToken(
      resetPasswordToken,
      authConfig.RESET_PASSWORD_SECRET
    );

    // 💾 Prisma  // 更新密碼到資料庫 (password)
    const updatedUser = await updateUserPassword(user.email, password);

    // 清除舊的 cookie
    res.clearCookie(`${authConfig.AUTH_TOKEN_NAME}`);

    // 生成 token 和設置 cookie
    generateAuthTokenAndSetCookie(updatedUser, res);

    res.status(200).json({
      status: "success",
      message: "密碼重設成功",
    });
  } catch (err) {
    next(err);
  }
}
