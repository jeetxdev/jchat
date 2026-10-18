const ERROR_MESSAGES = {
  ROUTE_NOT_FOUND: "Route not found",
  VALIDATION_FAILED: "Validation failed",
  INVALID_JSON: "Invalid JSON body",
  INTERNAL_ERROR: "Internal server error",
  INVALID_COUNTRY_CODE: "Invalid country code",
  INVALID_PHONE_NUMBER: "Invalid phone number",
} as const;

export { ERROR_MESSAGES };
export type ErrorMessages = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
