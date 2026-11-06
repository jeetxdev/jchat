import { Pool } from "pg";
import { ENV } from "../config/env.js";
import { logger } from "../lib/logger.js";

export const pool = new Pool({
  connectionString: ENV.DATABASE_URL_POOLED,
  max: ENV.DB_POOL_MAX,
  connectionTimeoutMillis: ENV.DB_CONNECTION_TIMEOUT,
  idleTimeoutMillis: ENV.DB_IDLE_TIMEOUT,
});

pool.on("error", (err) => {
  logger.error(err);
});
