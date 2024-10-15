import { Request, Response } from "express";

export default class MethodNotAllowedMiddleware {
  static handleErrors(req: Request, res: Response): void {
    res
      .status(405)
      .json({ status: "error", message: `Method ${req.method} Not Allowed` });
    return;
  }
}
