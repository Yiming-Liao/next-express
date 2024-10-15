import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { appConfig } from "@/config/appConfig.ts";
import { router } from "@/routes/entry.ts";
import expressListEndpoints from "express-list-endpoints";
import MethodNotAllowedMiddleware from "#/middlewares/error/MethodNotAllowedMiddleware.ts";
import ErrorMiddleware from "#/middlewares/error/ErrorMiddleware.ts";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // 只允許此來源
    credentials: true, // 允許 cookie 傳遞
  })
);

app.use("/api/v1", router); // 路由進入口 /api/v1

// console 所有路由
const endpoints = expressListEndpoints(app);
console.log(endpoints);

// 不支持的方法 Middleware
app.use(MethodNotAllowedMiddleware.handleErrors);

// 錯誤處理 Middleware
app.use(ErrorMiddleware.handleErrors);

app.listen(appConfig.PORT, () => {
  console.log(`[伺服器] 正在運行於 http://localhost:${appConfig.PORT}`);
});
