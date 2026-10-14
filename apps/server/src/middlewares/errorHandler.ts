import type { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";
import type { ErrorResponse } from "../types/response.js";
import { HTTP_STATUS } from "../constants/http.js";
import { ENV } from "../config/env.js";

const isJsonParseError = (error: unknown): boolean => {
  if (!(error instanceof SyntaxError)) {
    return false;
  }
  const parseError = error as { status?: unknown; type?: unknown };
  return parseError.status === 400 && parseError.type === "entity.parse.failed";
};

export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const errorResponse: ErrorResponse = {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  };
  if (isJsonParseError(err)) {
    errorResponse.status = HTTP_STATUS.BAD_REQUEST;
    errorResponse.code = ERROR_CODES.VALIDATION_ERROR;
    errorResponse.message = "Invalid JSON body";
  } else if (err instanceof AppError) {
    errorResponse.status = err.status;
    errorResponse.code = err.code;
    errorResponse.message = err.message;
    errorResponse.details = err.details;
  } else {
    req.log.error(err);
  }
  if (ENV.NODE_ENV === "development") {
    errorResponse.stack = err instanceof Error ? err.stack : undefined;
  }
  res.status(errorResponse.status).json(errorResponse);
};
