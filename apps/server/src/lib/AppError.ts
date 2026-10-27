import { ERRORS, type Errors } from "../constants/errors.js";
import type { HttpStatus } from "../constants/httpStatuses.js";

type AppErrorOptions = {
  message?: string;
  details?: unknown;
};

export class AppError extends Error {
  status: HttpStatus;
  code: Errors;
  details: unknown;
  constructor(code: Errors, { message, details }: AppErrorOptions = {}) {
    super(message ?? ERRORS[code].message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "AppError";
    this.status = ERRORS[code].status;
    this.code = code;
    this.details = details;
  }
}
