import type { Response } from "express";
import type { SuccessResponse } from "../types/response.js";
import type { HttpStatus } from "../constants/httpStatuses.js";

export const sendSuccess = <T>(res: Response, status: HttpStatus, data: T, message?: string) => {
  const response: SuccessResponse<T> = {
    status,
    data,
    message,
  };
  res.status(status).json(response);
};
