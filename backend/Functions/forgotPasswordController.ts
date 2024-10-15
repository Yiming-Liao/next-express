import findUser from "@/database/auth/findUser.ts";
import sendResetPasswordEmail from "@/mails/auth/sendResetPasswordEmail.ts";
import { forgotPasswordSchema } from "@/validators/auth/forgotPasswordSchema.ts";
import validateInput from "@/validators/validateInput.ts";
import { NextFunction, Request, Response } from "express";

export default async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // JOI 驗證輸入資料
    validateInput(forgotPasswordSchema, req);

    const { email } = req.body;

    // 💾 Prisma  // 檢查該 email 是否存在
    await findUser(email);

    // 發送重置密碼的郵件
    await sendResetPasswordEmail(email);

    res.status(200).json({
      status: "success",
      message: "重設密碼驗證信已寄出",
    });
  } catch (err) {
    next(err);
  }
}
