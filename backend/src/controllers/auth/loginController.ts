import { NextFunction, Request, Response } from "express";
import { loginSchema } from "@/validators/auth/loginValidator.ts";
import { findUser } from "@/database/auth/findUser.ts";
import verifyPassword from "@/services/auth/verifyPassword.ts";
import generateToken from "@/services/generateToken.ts";
import setCookie from "@/services/setCookie.ts";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // JOI 驗證輸入資料
    const { error: validateError } = loginSchema.validate(req.body);
    if (validateError) throw validateError; // 丟出錯誤，讓錯誤中介軟體處理

    // 前端傳來的資料
    const { email, password } = req.body;

    // 💾 Prisma
    const { user } = await findUser(email);

    // 使用抽象的密碼檢查函式
    await verifyPassword(password, user?.password || "");

    // 生成 token
    const token = generateToken(user);
    // 將 token 附加到 cookie
    setCookie(res, token);

    res.json({
      status: "success",
      userData: { username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    next(error);
  }
};
