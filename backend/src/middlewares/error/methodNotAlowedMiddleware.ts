import { Request, Response } from "express";

export default function methodNotAllowedMiddleware(
  req: Request,
  res: Response
): void {
  res
    .status(405)
    .json({ status: "error", message: `Method ${req.method} Not Allowed` });
  return;
}
