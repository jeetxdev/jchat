import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) {
    res.status(err.status).json({
      status: err.status,
      code: err.code,
      message: err.message,
      details: err.details,
    });
  } else {
    res.status(500).json({
      status: 500,
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    });
  }
};
