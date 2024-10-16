import nodemailer from "nodemailer";
import { appConfig } from "!/config/appConfig.ts";
import { mailConfig } from "!/config/mailConfig.ts";
import HttpError from "@/HttpError.ts";
import TokenService from "#/services/TokenService.ts"; // 確保匯入 TokenType
import { authConfig } from "!/config/authConfig.ts";

export default async function sendResetPasswordEmail(user: any): Promise<void> {
  // 生成 resetPasswordToken
  const resetPasswordToken = TokenService.generateJwtToken(
    user,
    authConfig.RESET_PASSWORD_SECRET,
    "1h"
  );

  // 重設連結
  const resetPasswordLink = `${appConfig.FRONTEND_URL}/reset-password?resetPasswordToken=${resetPasswordToken}`;

  // 設定
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: mailConfig.MAIL_USERNAME,
      pass: mailConfig.MAIL_PASSWORD,
    },
  });

  // 撰寫 email
  const mailOptions = {
    from: mailConfig.MAIL_USERNAME,
    to: user.email,
    subject: "請請重設您的密碼",
    html: `<p>請點擊以下連結重設您的密碼：</p><a href="${resetPasswordLink}">${resetPasswordLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new HttpError(`[密碼重設驗證信 寄送錯誤] ${err.message}`, 500);
  }
}
