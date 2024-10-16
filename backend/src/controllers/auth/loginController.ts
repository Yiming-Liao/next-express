import { NextFunction, Request, Response } from "express";
import LoginControllerCore from "#/controllers/auth/LoginController.ts";

class LoginController extends LoginControllerCore {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // 驗證資料
      super.validate(req);

      // 💾 Prisma
      const user = await super.findUser(req);

      // 驗證密碼
      await super.verifyPassword(req, user.password);

      // 刷新 authToken
      await super.renewAuthTokenWithCookie(req, res, user);

      res.json({
        status: "success",
        userData: { username: user.username, email: user.email },
        message: "登入成功",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new LoginController();
