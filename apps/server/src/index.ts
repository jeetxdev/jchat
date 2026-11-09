import { createApp } from "./app";
import { API_BASE_PATH, ENV } from "./config/env";
import { logger } from "./lib/logger";
import { pool } from "./db";

const SHUTDOWN_TIMEOUT_MS = 10000;

const app = createApp();
const server = app.listen(ENV.PORT, () => {
  logger.info(`jChat API listening on http://localhost:${ENV.PORT}${API_BASE_PATH}`);
});
let shutdownInProgress = false;
let exitCode = 1;

const shutdown = (signal: NodeJS.Signals) => {
  if (shutdownInProgress) return;
  shutdownInProgress = true;

  logger.info(`${signal} received, shutting down...`);

  setTimeout(() => {
    exitCode = 1;
    process.exit(exitCode);
  }, SHUTDOWN_TIMEOUT_MS);

  server.close(async (err) => {
    if (err) logger.error(err);
    try {
      await pool.end();
      if (err) exitCode = 1;
      else exitCode = 0;
    } catch (error) {
      logger.error(error);
      exitCode = 1;
    }
    process.exit(exitCode);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
