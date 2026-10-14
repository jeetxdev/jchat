import express from "express";
import { API_BASE_PATH, ENV } from "./config/env.js";
import { router } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./config/zod.js";
import { logger } from "./lib/logger.js";
import { pinoHttp } from "pino-http";

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.use(API_BASE_PATH, router);

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  logger.info(`jChat API listening on http://localhost:${ENV.PORT}${API_BASE_PATH}`);
});
