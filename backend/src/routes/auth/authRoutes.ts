import { Router } from "express";
import AuthMiddleware from "@/middlewares/auth/authMiddleware.ts";
import RegisterController from "@/controllers/auth/RegisterController.ts";
import LoginController from "@/controllers/auth/LoginController.ts";
import LogoutController from "@/controllers/auth/LogoutController.ts";
import VerifyEmailController from "@/controllers/auth/VerifyEmailController.ts";
import ChangePasswordController from "@/controllers/auth/ChangePasswordController.ts";
import ForgotPasswordController from "@/controllers/auth/ForgotPasswordController.ts";
import ResetPasswordController from "@/controllers/auth/ResetPasswordController.ts";

export const authRouter = Router();

// [POST] 註冊 {Guest} <form>
authRouter.route("/register").post(RegisterController.register);

// [POST] 登入 {Guest} <form>
authRouter.route("/login").post(LoginController.login);

// [POST] 登出 {Guest/UnverifiedUser}
authRouter.route("/logout").post(LogoutController.logout);

// [POST] 驗證信 {Guest/UnverifiedUser} (用戶點開連結)
authRouter.route("/verify-email").post(VerifyEmailController.verifyEmail);

// [POST] 再次寄送驗證信 {UnverifiedUser}
authRouter
  .route("/resend-verification-email")
  .post(
    AuthMiddleware.unverifiedUser,
    VerifyEmailController.resendVerificationEmail
  );

// [POST] 更改密碼 {VerifiedUser} <form>
authRouter
  .route("/change-password")
  .post(AuthMiddleware.verifiedUser, ChangePasswordController.changePassword);

// [POST] 忘記密碼 {UnverifiedUser} <form>
authRouter
  .route("/forgot-password")
  .post(ForgotPasswordController.forgotPassword);

// [POST] 重設密碼 {UnverifiedUser} <form>
authRouter.route("/reset-password").post(ResetPasswordController.resetPassword);
