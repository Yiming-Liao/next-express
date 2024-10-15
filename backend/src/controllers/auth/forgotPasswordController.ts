import ForgotPasswordControllerCore from "#/controllers/auth/ForgotPasswordController.ts";
import { NextFunction, Request, Response } from "express";

class ForgotPasswordController extends ForgotPasswordControllerCore {
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // 驗證資料
      super.validate(req);

      // 💾 Prisma
      const user = await super.findUser(req);

      // 驗證密碼
      await super.sendResetPasswordEmail(user.email);

      res.status(200).json({
        status: "success",
        message: "重設密碼驗證信已寄出",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ForgotPasswordController();
