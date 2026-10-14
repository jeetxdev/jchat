import type { ErrorCode } from "../constants/errorCodes.js";
import type { HttpStatus } from "../constants/http.js";

export type SuccessResponse<T> = {
  status: HttpStatus;
  data: T;
  message?: string;
};

export type ErrorResponse = {
  status: HttpStatus;
  code: ErrorCode;
  message: string;
  details?: unknown;
  stack?: unknown;
};
