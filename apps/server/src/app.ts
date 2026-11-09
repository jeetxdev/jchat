import express from "express";
import { API_BASE_PATH } from "./config/env";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import "./config/zod";
import { logger } from "./lib/logger";
import { pinoHttp } from "pino-http";
import { AppError } from "./lib/AppError";

export const createApp = () => {
  const app = express();
  app.use(pinoHttp({ logger }));
  app.use(express.json());
  app.use(API_BASE_PATH, router);
  app.use((_req, _res) => {
    throw new AppError("ROUTE_NOT_FOUND");
  });
  app.use(errorHandler);
  return app;
};
