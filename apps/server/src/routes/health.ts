import { Router } from "express";
import { sendSuccess } from "../utils/apiResponse";
import { HTTP_STATUS } from "../constants";
import { pool } from "../db";
import { AppError } from "../lib/AppError";
import { logger } from "../lib/logger";

export const healthRouter = Router();

healthRouter.get("/health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    const db = result.rows[0]["?column?"] === 1;
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
