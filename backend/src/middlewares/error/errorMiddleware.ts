import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";

export default function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.warn("||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
  console.error("✖️: ", err); // 記錄錯誤到控制台
  console.warn("||||||||||||||||||||||||||||||||||||||||||||||||||||||||");

  // JOI 資料輸入錯誤
  if (err.isJoi) {
    res.status(400).json({ status: "error", message: err.details[0].message });
    return;
  }

  // Prisma 資料庫錯誤
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      // User 模型的 Unique資料重複
      if (err.meta.modelName === "User") {
        res.status(400).json({
          status: "error",
          message: "✖️ 使用者已存在，請使用其他電子郵件或用戶名。",
        });
        return;
      }
    }
  }

  // 其他錯誤
  res
    .status(500)
    .json({ status: "error", message: "✖️ 伺服器內部錯誤，請稍後再試。" });
  return;
}
