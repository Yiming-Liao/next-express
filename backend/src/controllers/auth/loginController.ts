import { NextFunction, Request, Response } from "express";
import { loginSchema } from "@/validators/auth/loginSchema.ts";
import findUser from "@/database/auth/findUser.ts";
import verifyPassword from "@/services/auth/verifyPassword.ts";
import generateAuthTokenAndSetCookie from "@/services/generateAuthTokenAndSetCookie.ts";
import validateInput from "@/validators/validateInput.ts";

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // JOI 驗證輸入資料
    validateInput(loginSchema, req);

    // 取得前端傳來的資料
    const { email, password } = req.body;

    // 💾 Prisma
    const user = await findUser(email);

    // 驗證密碼
    await verifyPassword(password, user?.password || "");

    // 生成 token ＆ 設置 cookie
    generateAuthTokenAndSetCookie(user, res);

    res.json({
      status: "success",
      userData: { username: user.username, email: user.email },
      message: "登入成功",
    });
  } catch (err) {
    next(err);
  }
}
