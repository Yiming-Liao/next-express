import nodemailer from "nodemailer";
import { appConfig } from "@/config/appConfig.ts";
import { mailConfig } from "@/config/mailConfig.ts";
import HttpError from "@/HttpError.ts";
import generateVerifyToken from "@/services/generateVerifyToken.ts";

export default async function sendResetPasswordEmail(
  email: string
): Promise<void> {
  // 生成 驗證 token
  const resetPasswordToken = generateVerifyToken("resetPassword", email);

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
    to: email,
    subject: "請請重設您的密碼",
    html: `<p>請點擊以下連結重設您的密碼：</p><a href="${resetPasswordLink}">${resetPasswordLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new HttpError("寄送驗證信失敗: ", 500);
  }
}
