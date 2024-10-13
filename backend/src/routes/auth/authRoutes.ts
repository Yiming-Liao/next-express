import { Request, Response, Router } from "express";
import { register } from "@/controllers/auth/registerController.ts";
import { login } from "@/controllers/auth/loginController.ts";
import { authMiddleware } from "@/middlewares/auth/authMiddleware.ts";
import { logout } from "@/controllers/auth/logoutController.ts";

export const authRouter = Router();

// 註冊
authRouter.route("/register").post(register);

// 登入
authRouter.route("/login").post(login);

// 登出
authRouter.route("/logout").post(logout);

// 取得使用者資料
authRouter.route("/user").get(authMiddleware, (req: Request, res: Response) => {
  res.json({ message: "This is a protected route", user: req.user });
});
