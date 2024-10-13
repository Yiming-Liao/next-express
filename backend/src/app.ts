import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { serverConfig } from "@/config/app.ts";
import { router } from "@/routes/entry.ts";
import errorMiddleware from "./middlewares/error/errorMiddleware.ts";
import methodNotAllowedMiddleware from "./middlewares/error/methodNotAlowedMiddleware.ts";
import expressListEndpoints from "express-list-endpoints";

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

app.use(router); // 路由進入口

// console 所有路由
const endpoints = expressListEndpoints(app);
console.log(endpoints);

// 捕獲不支持的方法
app.use(methodNotAllowedMiddleware);

// 註冊錯誤處理中介軟體
app.use(errorMiddleware);

app.listen(serverConfig.PORT, () => {
  console.log(`[伺服器] 正在運行於 http://localhost:${serverConfig.PORT}`);
});
