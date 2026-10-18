import { ERROR_STATUS, type ErrorCode } from "../constants/errorCodes.js";
import type { HttpStatus } from "../constants/httpStatuses.js";

export class AppError extends Error {
  status: HttpStatus;
  code: ErrorCode;
  details: unknown;
  constructor(code: ErrorCode, message: string, details?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "AppError";
    this.status = ERROR_STATUS[code];
    this.code = code;
    this.details = details;
  }
}
