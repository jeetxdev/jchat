import { HTTP_STATUS, type HttpStatus } from "./httpStatuses.js";

const ERRORS = {
  ROUTE_NOT_FOUND: {
    message: "Route not found",
    status: HTTP_STATUS.NOT_FOUND,
  },
  VALIDATION_FAILED: {
    message: "Validation failed",
    status: HTTP_STATUS.BAD_REQUEST,
  },
  INVALID_JSON: {
    message: "Invalid JSON body",
    status: HTTP_STATUS.BAD_REQUEST,
  },
  INTERNAL_ERROR: {
    message: "Internal server error",
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  DB_CONNECTION_ERROR: {
    message: "Database connection error",
    status: HTTP_STATUS.SERVICE_UNAVAILABLE,
  },
} as const satisfies Record<string, { message: string; status: HttpStatus }>;

export type Errors = keyof typeof ERRORS;
export { ERRORS };
