import nodemailer from "nodemailer";
import { appConfig } from "!/config/appConfig.ts";
import { mailConfig } from "!/config/mailConfig.ts";
import HttpError from "@/HttpError.ts";
import TokenService from "#/services/TokenService.ts";
import { authConfig } from "!/config/authConfig.ts";

export default async function sendVerificationEmail(
  email: string
): Promise<void> {
  // 生成 verifyEmailToken
  const verifyEmailToken = TokenService.generateJwtToken(
    email,
    authConfig.EMAIL_VERIFICATION_SECRET,
    "1d"
  );

  // 驗證連結
  const verificationLink = `${appConfig.FRONTEND_URL}/verify-email?verifyEmailToken=${verifyEmailToken}`;

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
    to: email,
    subject: "請驗證您的電子郵件",
    html: `<p>請點擊以下連結驗證您的電子郵件：</p><a href="${verificationLink}">${verificationLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new HttpError(`[信箱驗證信 寄送錯誤] ${err.message}`, 500);
  }
}
