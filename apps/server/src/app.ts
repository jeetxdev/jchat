import express from "express";
import { API_BASE_PATH } from "./config/env.js";
import { router } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./config/zod.js";
import { logger } from "./lib/logger.js";
import { pinoHttp } from "pino-http";
import { AppError } from "./lib/AppError.js";
import { HTTP_STATUS, ERROR_MESSAGES, ERROR_CODES } from "./constants/index.js";

export const createApp = () => {
  const app = express();
  app.use(pinoHttp({ logger }));
  app.use(express.json());
  app.use(API_BASE_PATH, router);
  app.use((_req, _res) => {
    throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
  });
  app.use(errorHandler);
  return app;
};
