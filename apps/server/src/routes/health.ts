import { Router } from "express";
import { sendSuccess } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatuses.js";
import { pool } from "../db/client.js";
import { AppError } from "../lib/AppError.js";
import { logger } from "../lib/logger.js";

export const healthRouter = Router();

healthRouter.get("/health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    const db = result.rows[0] ? true : false;
    const data = {
      uptime: process.uptime(),
      db,
    };
    sendSuccess(res, HTTP_STATUS.OK, data);
  } catch (err) {
    logger.error(err);
    throw new AppError("DB_CONNECTION_ERROR");
  }
});
