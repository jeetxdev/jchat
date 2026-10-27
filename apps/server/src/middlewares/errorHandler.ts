import type { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/AppError.js";
import type { ErrorResponse } from "../types/response.js";
import { ENV } from "../config/env.js";

const isJsonParseError = (error: unknown): boolean => {
  if (!(error instanceof SyntaxError)) {
    return false;
  }
  const parseError = error as { status?: unknown; type?: unknown };
  return parseError.status === 400 && parseError.type === "entity.parse.failed";
};

const toAppError = (err: unknown): AppError => {
  if (err instanceof AppError) return err;
  if (isJsonParseError(err)) return new AppError("INVALID_JSON");
  return new AppError("INTERNAL_ERROR");
};

export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const { status, code, message, details } = toAppError(err);
  if (!(err instanceof AppError) && !isJsonParseError(err)) {
    req.log.error(err);
  }
  const errorResponse: ErrorResponse = { status, code, message, details };
  // Stack comes from the original error, not the wrapper AppError.
  if (ENV.NODE_ENV === "development" && code !== "ROUTE_NOT_FOUND") {
    errorResponse.stack = err instanceof Error ? err.stack : undefined;
  }
  res.status(status).json(errorResponse);
};
