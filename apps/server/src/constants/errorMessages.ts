const ERROR_MESSAGES = {
  NOT_FOUND: "Not Found",
  VALIDATION_ERROR: "Validation failed",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  INVALID_COUNTRY_CODE: "Invalid country code",
  INVALID_PHONE_NUMBER: "Invalid phone number",
} as const;

export { ERROR_MESSAGES };
export type ErrorMessages = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
