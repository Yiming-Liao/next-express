import { Request, Response, NextFunction } from "express"; // 加入 NextFunction 以便於錯誤傳遞
import createUser from "@/database/auth/createUser.ts";
import { registerSchema } from "@/validators/auth/registerSchema.ts";
import sendVerificationEmail from "@/mails/auth/sendVerificationEmail.ts";
import generateAuthTokenAndSetCookie from "@/services/generateAuthTokenAndSetCookie.ts";
import validateInput from "@/validators/validateInput.ts";

export default async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // JOI 驗證輸入資料
    validateInput(registerSchema, req);

    // 前端傳來的資料
    const { username, email, password } = req.body;

    // 💾 Prisma
    const { user } = await createUser(username, email, password);

    // 發送驗證信
    await sendVerificationEmail(user.email);

    // 生成 token 和設置 cookie [尚未驗證 email]
    generateAuthTokenAndSetCookie(user, res);

    res.status(201).json({
      status: "success",
      userData: { username: user.username, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}
