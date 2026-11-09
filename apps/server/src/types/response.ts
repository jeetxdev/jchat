import type { Errors } from "../constants/errors";
import type { HttpStatus } from "../constants/httpStatuses";

export type SuccessResponse<T> = {
  status: HttpStatus;
  data: T;
  message?: string;
};

export type ErrorResponse = {
  status: HttpStatus;
  code: Errors;
  message: string;
  details?: unknown;
  stack?: unknown;
};
