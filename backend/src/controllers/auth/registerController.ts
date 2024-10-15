import { Request, Response, NextFunction } from "express";
import RegisterControllerCore from "#/controllers/auth/RegisterController.ts";

class RegisterController extends RegisterControllerCore {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // 驗證資料
      super.validate(req);

      // 💾 Prisma
      const user = await super.createUser(req);

      // 寄送驗證信
      await super.sendResetPasswordEmail(user.email);

      // 刷新 authToken
      await super.renewAuthTokenWithCookie(req, res, user);

      res.json({
        status: "success",
        userData: { username: user.username, email: user.email },
        message: "註冊成功",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new RegisterController();
