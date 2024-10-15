import ResetPasswordControllerCore from "#/controllers/auth/ResetPasswordController.ts";
import { NextFunction, Request, Response } from "express";

class ResetPasswordController extends ResetPasswordControllerCore {
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // 驗證資料
      super.validate(req);

      // 驗證 resetPasswordToken
      const user = super.verifyJwtToken(req);

      // 💾 Prisma 更新密碼
      const updatedUser = await super.updateUserPassword(req, user.email);

      // 刷新 authToken
      await super.renewAuthTokenWithCookie(req, res, updatedUser);

      res.json({
        status: "success",
        userData: { username: user.username, email: user.email },
        message: "密碼重設成功",
      });
    } catch (err) {
      next(err);
    }
  }
}
export default new ResetPasswordController();
