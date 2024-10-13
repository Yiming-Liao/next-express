import { Request, Response, NextFunction } from "express"; // 加入 NextFunction 以便於錯誤傳遞
import { createUser } from "@/database/auth/createUser.ts";
import { registerSchema } from "@/validators/auth/registerValidator.ts";
import generateToken from "@/services/generateToken.ts";
import setCookie from "@/services/setCookie.ts";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // JOI 驗證輸入資料
    const { error: validateError } = registerSchema.validate(req.body);
    if (validateError) throw validateError; // 丟出錯誤，讓錯誤中介軟體處理

    // 前端傳來的資料
    const { username, email, password } = req.body;

    // 💾 Prisma
    const { user } = await createUser(username, email, password);

    // 生成 token
    const token = generateToken(user);
    // 將 token 附加到 cookie
    setCookie(res, token);

    res.status(201).json({
      status: "success",
      userData: { username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
