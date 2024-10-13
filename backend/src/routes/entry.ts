import { Request, Response, Router } from "express";
import { authRouter } from "@/routes/auth/authRoutes.ts";
import HelloController from "@/controllers/HelloController.ts";

export const router = Router();

router.use("/api/auth", authRouter); // 將路由掛載在 /api/auth

router
  .route("/")
  .get((req: Request, res: Response) => HelloController.hello(req, res));
