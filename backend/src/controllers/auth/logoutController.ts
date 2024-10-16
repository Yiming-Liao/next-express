import LogoutControllerCore from "#/controllers/auth/LogoutController.ts";
import { NextFunction, Request, Response } from "express";

/**
 * 登出控制器
 */
class LogoutController extends LogoutControllerCore {
  logout(req: Request, res: Response, next: NextFunction) {
    try {
      super.clearCookie(req, res); // 調用父類別的 logout 方法

      res.json({
        status: "success",
        message: "登出成功！",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new LogoutController();
