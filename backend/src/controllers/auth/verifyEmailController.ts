import VerifyEmailControllerCore from "#/controllers/auth/VerifyEmailController.ts";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

// 定義自定義的 Request 類型
interface CustomRequest extends Request {
  user: JwtPayload; // 或者是您的用戶類型
}

class VerifyEmailController extends VerifyEmailControllerCore {
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      // 驗證資料
      super.validate(req);

      // 驗證 verifyEmailToken
      const user = super.verifyJwtToken(req);

      // 💾 Prisma 更新密碼
      const updatedUser = await super.markEmailAsVerified(user.email);

      // 刷新 authToken
      await super.renewAuthTokenWithCookie(req, res, updatedUser);

      res.json({
        status: "success",
        userData: { username: user.username, email: user.email },
        message: "信箱驗證成功",
      });
    } catch (err) {
      next(err);
    }
  }

  // 再次寄送驗證信
  async resendVerificationEmail(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await super.findUser(req.user.email);

      super.sendResetPasswordEmail(user.email);
      res.json({
        status: "success",
        userData: { username: user.username, email: user.email },
        message: "信箱驗證成功",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new VerifyEmailController();
