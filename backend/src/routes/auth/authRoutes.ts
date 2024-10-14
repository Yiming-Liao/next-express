import { Request, Response, Router } from "express";
import register from "@/controllers/auth/registerController.ts";
import login from "@/controllers/auth/loginController.ts";
import authMiddleware from "@/middlewares/auth/authMiddleware.ts";
import logout from "@/controllers/auth/logoutController.ts";
import verifyEmail from "@/controllers/auth/verifyEmailController.ts";
import changePassword from "@/controllers/auth/changePasswordController.ts";
import forgotPassword from "@/controllers/auth/forgotPasswordController.ts";
import resetPassword from "@/controllers/auth/resetPasswordController.ts";

export const authRouter = Router();

// [POST] 註冊 <form>
authRouter.route("/register").post(register);

// [POST] 登入 <form>
authRouter.route("/login").post(login);

// [POST] 登出
authRouter.route("/logout").post(logout);

// [GET] 驗證信 (用戶點開連結)
authRouter.route("/verify-email").get(verifyEmail);

// [POST] 更改密碼  <form> [授權驗證 authMiddleware]
authRouter.route("/change-password").post(authMiddleware, changePassword);

// [POST] 忘記密碼  <form>
authRouter.route("/forgot-password").post(forgotPassword);

// [POST] 重設密碼  <form>
authRouter.route("/reset-password").post(resetPassword);

// 取得使用者資料
authRouter.route("/user").get(authMiddleware, (req: Request, res: Response) => {
  res.json({ message: "This is a protected route", user: req.user });
});
