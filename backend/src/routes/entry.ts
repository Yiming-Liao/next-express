import { Router } from "express";
import { authRouter } from "@/routes/auth/authRoutes.ts";
import { userRouter } from "@/routes/user/userRoutes.ts";

export const router = Router();

router.use("/auth", authRouter); // 將路由掛載在 /api/v1/auth

router.use("/user", userRouter); // 將路由掛載在 /api/v1/user
