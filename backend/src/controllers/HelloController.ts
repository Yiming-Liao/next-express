import { Request, Response } from "express";

export default class HelloController {
  public static hello(req: Request, res: Response): Response | void {
    // 將方法設為靜態
    return res.json({ message: "Hello!" });
  }
}
