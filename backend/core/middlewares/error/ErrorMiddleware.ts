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
    // 只在開發環境顯示詳細的錯誤堆疊
    if (process.env.NODE_ENV !== "production" && err.stack) {
      console.warn(
        "\x1b[36m%s\x1b[0m",
        "========================================================================"
      );
      // 限制只顯示前幾層堆疊
      const stackLines = err.stack.split("\n");
      const limitedStack = stackLines.slice(0, 4).join("\n");
      console.info(limitedStack);
      console.warn(
        "\x1b[36m%s\x1b[0m",
        "========================================================================"
      );
    }

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

    // 捕獲所有錯誤並回傳
    res.status(err.statusCode || 500).json({
      status: "error",
      message: "發生錯誤，請稍後再試！", // 使用通用自訂錯誤訊息
    });
  }
}
