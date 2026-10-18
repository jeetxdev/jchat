import { HTTP_STATUS, type HttpStatus } from "./httpStatuses.js";

const ERROR_CODES = {
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  VALIDATION_FAILED: "VALIDATION_FAILED",
  INVALID_JSON: "INVALID_JSON",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// Single source of truth for code -> HTTP status, so call sites never pair them manually.
const ERROR_STATUS: Record<ErrorCode, HttpStatus> = {
  ROUTE_NOT_FOUND: HTTP_STATUS.NOT_FOUND,
  VALIDATION_FAILED: HTTP_STATUS.BAD_REQUEST,
  INVALID_JSON: HTTP_STATUS.BAD_REQUEST,
  INTERNAL_ERROR: HTTP_STATUS.INTERNAL_SERVER_ERROR,
};

export { ERROR_CODES, ERROR_STATUS };
