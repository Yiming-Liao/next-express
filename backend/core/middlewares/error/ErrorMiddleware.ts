import { Request, Response, NextFunction } from "express";
import PrismaErrorMiddleware from "#/middlewares/error/PrismaErrorMiddleware.ts";
import HttpError from "#/HttpError.ts";

export default class ErrorMiddleware {
  static handleErrors(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.warn(
      "\x1b[36m%s\x1b[0m",
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );
    console.error("Error Middleware 捕獲到錯誤: ", err); // 記錄錯誤到控制台
    console.warn(
      "\x1b[36m%s\x1b[0m",
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );

    // JOI 資料輸入錯誤
    if (err.isJoi) {
      res
        .status(400)
        .json({ status: "error", message: err.details[0].message });
      return;
    }

    // 捕獲 prisma 錯誤
    PrismaErrorMiddleware.handleErrors(err, req, res, next);

    // 檢查是否是自訂的 HttpError
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
      return;
    }

    // 捕獲所有錯誤並回傳 // 若沒有 客製化錯誤 則回傳 500 伺服器錯誤
    res.status(err.statusCode || 500).json({
      status: "error",
      message: err.message || "伺服器錯誤",
    });
    return;
  }
}
