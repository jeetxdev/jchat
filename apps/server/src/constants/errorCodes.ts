const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export { ERROR_CODES };
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

const ERROR_MESSAGES = {
  VALIDATION_ERROR: "Validation failed",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  INVALID_COUNTRY_CODE: "Invalid country code",
  INVALID_PHONE_NUMBER: "Invalid phone number",
} as const;

export { ERROR_MESSAGES };
export type ErrorMessages = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
