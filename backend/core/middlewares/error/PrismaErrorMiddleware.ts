import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client"; // 匯入 Prisma 的錯誤類型

export default class PrismaErrorMiddleware {
  static handleErrors(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    // 判斷是否為 Prisma 錯誤
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // 根據錯誤的 code 做相應處理
      switch (err.code) {
        case "P2002": // 唯一約束違反
          res.status(409).json({
            status: "error",
            message: `該 ${err.meta?.target} 已經存在`,
          });
          return;
        case "P2025": // 找不到指定的資料
          res.status(404).json({
            status: "error",
            message: "找不到該筆資料",
          });
          return;
        // 可以添加更多 Prisma 錯誤處理...
        default:
          res.status(500).json({
            status: "error",
            message: "伺服器錯誤",
          });
          return;
      }
    }

    // 如果不是 Prisma 錯誤，繼續到下一個中介軟體
    next(err);
  }
}
