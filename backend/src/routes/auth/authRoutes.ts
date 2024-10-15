import { Request, Response, Router } from "express";
import AuthMiddleware from "@/middlewares/auth/authMiddleware.ts";
import RegisterController from "@/controllers/auth/RegisterController.ts";
import LoginController from "@/controllers/auth/LoginController.ts";
import LogoutController from "@/controllers/auth/LogoutController.ts";
import VerifyEmailController from "@/controllers/auth/VerifyEmailController.ts";
import ChangePasswordController from "@/controllers/auth/ChangePasswordController.ts";
import ForgotPasswordController from "@/controllers/auth/ForgotPasswordController.ts";
import ResetPasswordController from "@/controllers/auth/ResetPasswordController.ts";

export const authRouter = Router();

// [POST] 註冊 <form>
authRouter.route("/register").post(RegisterController.register);

// [POST] 登入 <form>
authRouter.route("/login").post(LoginController.login);

// [POST] 登出
authRouter.route("/logout").post(LogoutController.logout);

// [POST] 驗證信 (用戶點開連結)
authRouter.route("/verify-email").post(VerifyEmailController.verifyEmail);

// [POST] 再次寄送驗證信
authRouter
  .route("/resend-verification-email")
  .post(
    AuthMiddleware.handleAuth,
    VerifyEmailController.resendVerificationEmail
  );

// [POST] 更改密碼  <form> [授權驗證 authMiddleware]
authRouter
  .route("/change-password")
  .post(AuthMiddleware.handleAuth, ChangePasswordController.changePassword);

// [POST] 忘記密碼  <form>
authRouter
  .route("/forgot-password")
  .post(ForgotPasswordController.forgotPassword);

// [POST] 重設密碼  <form>
authRouter.route("/reset-password").post(ResetPasswordController.resetPassword);

// 取得使用者資料
authRouter
  .route("/user")
  .get(AuthMiddleware.handleAuth, (req: Request, res: Response) => {
    res.json({ message: "你已通過信箱驗證～～～", user: req.user });
  });
