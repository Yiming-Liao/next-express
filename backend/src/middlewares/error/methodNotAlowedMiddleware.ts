import { Request, Response, NextFunction } from "express";

export default function methodNotAllowedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res
    .status(405)
    .json({ status: "error", message: `Method ${req.method} Not Allowed` });
}
