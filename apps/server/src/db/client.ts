import { Pool } from "pg";
import { ENV } from "../config/env.js";
import { logger } from "../lib/logger.js";

export const pool = new Pool({
  connectionString: ENV.DATABASE_URL_POOLED,
  max: ENV.DB_POOL_MAX,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 5000,
});

pool.on("error", (err) => {
  logger.error(err);
});
