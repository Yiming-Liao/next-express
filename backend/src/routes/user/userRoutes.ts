import { Request, Response, Router } from "express";
import AuthMiddleware from "@/middlewares/auth/authMiddleware.ts";

export const userRouter = Router();

// 取得使用者資料
userRouter
  .route("/")
  .get(AuthMiddleware.verifiedUser, (req: Request, res: Response) => {
    res.json({ message: "你已通過信箱驗證～～～", user: req.user });
  });

userRouter.route("/1").get((req: Request, res: Response) => {
  res.json({ message: "你已通過信箱驗證～～～", user: req.user });
});
