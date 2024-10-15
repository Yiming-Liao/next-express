import { Request, Response } from "express";

export default class MethodNotAllowedMiddleware {
  static handleErrors(req: Request, res: Response): void {
    res
      .status(405)
      .json({ status: "error", message: `[此方法不被允許: ${req.method}]` });
    return;
  }
}
