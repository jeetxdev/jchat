export class AppError extends Error {
  status: number;
  code: string;
  details: unknown;
  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
