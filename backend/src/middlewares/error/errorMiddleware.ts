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

  // 捕獲所有錯誤並回傳  // 若沒有客製化狀態則回傳 500 伺服器錯誤
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "伺服器錯誤",
  });
  return;
}
