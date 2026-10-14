import type { ErrorCode } from "../constants/errorCodes.js";
import type { HttpStatus } from "../constants/http.js";

export class AppError extends Error {
  status: HttpStatus;
  code: ErrorCode;
  details: unknown;
  constructor(status: HttpStatus, code: ErrorCode, message: string, details?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
