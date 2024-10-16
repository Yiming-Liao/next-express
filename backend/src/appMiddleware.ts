import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { appConfig } from "!/config/appConfig.ts";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import morgan from "morgan";
import chalk from "chalk";

const appMiddleware = (app: {
  use: (
    arg0: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >
  ) => void;
}) => {
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: appConfig.FRONTEND_URL,
      credentials: true,
    })
  );

  //   Morgan 輸入日誌到 console
  const customMorganFormat = morgan((tokens, req, res) => {
    let icon = res.statusCode < 400 ? "✔" : "✘";
    let textColor = res.statusCode < 400 ? "#4CAF50" : "#FF7043"; // 預設文字顏色為成功顏色

    return [
      chalk.hex(textColor)(`${icon}`), // 使用動態顏色的圖標
      chalk.hex(textColor)(`HTTP ${res.statusCode}`), // 根據狀態碼改變顏色的 HTTP 狀態碼
      chalk.hex(textColor)(
        `${tokens.method(req, res)} ${tokens.url(req, res)}`
      ), // 根據狀態碼改變顏色的 HTTP 方法和 URL
      //   chalk.hex(textColor)(`${tokens.res(req, res, "content-length") || 0} -`), // 根據狀態碼改變顏色的響應內容長度
      //   chalk.hex(textColor)(`${tokens["response-time"](req, res)} ms`), // 根據狀態碼改變顏色的響應時間
    ].join(" | "); // 使用分隔符號，使日誌更清晰
  });
  app.use(customMorganFormat);
};

export default appMiddleware;
