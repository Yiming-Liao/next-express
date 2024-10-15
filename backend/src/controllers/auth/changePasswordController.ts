import ChangePasswordControllerCore from "#/controllers/auth/ChangePasswordController.ts";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

// 定義自定義的 Request 類型
interface CustomRequest extends Request {
  user: JwtPayload; // 或者是您的用戶類型
}

class ChangePasswordController extends ChangePasswordControllerCore {
  async changePassword(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      // 驗證資料
      super.validate(req);

      // 已經經過 AuthMiddleware，req.user 已經有使用者資料

      // 💾 Prisma
      const foundUser = await super.findUser(req.user.email);

      // 驗證密碼 (oldPassword)
      await super.verifyPassword(req.body.oldPassword, foundUser.password);

      // 💾 Prisma  // 更新密碼到資料庫 (password)
      await super.updateUserPassword(foundUser.email, req.body.password);

      res.json({
        status: "success",
        userData: { username: req.user.username, email: req.user.email },
        message: "密碼更改成功",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ChangePasswordController();
