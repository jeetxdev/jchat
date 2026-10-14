import { AppError } from "../lib/AppError.js";
import { HTTP_STATUS } from "../constants/http.js";
import { ERROR_CODES, ERROR_MESSAGES } from "../constants/errorCodes.js";
import { type ZodType, type output } from "zod";
import type { Request, RequestHandler } from "express";

const validate =
  <
    P extends ZodType = ZodType<Request["params"]>,
    B extends ZodType = ZodType<unknown>,
    Q extends ZodType = ZodType<Request["query"]>,
  >(schemas: {
    body?: B;
    query?: Q;
    params?: P;
  }): RequestHandler<output<P>, unknown, output<B>, output<Q>> =>
  (req, _res, next) => {
    const errors: { field: string; message: string }[] = [];
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        errors.push(
          ...result.error.issues.map((issue) => ({
            field: ["body", ...issue.path].join("."),
            message: issue.message,
          })),
        );
      } else {
        req.body = result.data;
      }
    }
    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        errors.push(
          ...result.error.issues.map((issue) => ({
            field: ["query", ...issue.path].join("."),
            message: issue.message,
          })),
        );
      } else {
        Object.defineProperty(req, "query", {
          value: result.data,
          enumerable: true,
          writable: true,
          configurable: true,
        });
      }
    }
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        errors.push(
          ...result.error.issues.map((issue) => ({
            field: ["params", ...issue.path].join("."),
            message: issue.message,
          })),
        );
      } else {
        req.params = result.data;
      }
    }
    if (errors.length > 0) {
      return next(
        new AppError(
          HTTP_STATUS.BAD_REQUEST,
          ERROR_CODES.VALIDATION_ERROR,
          ERROR_MESSAGES.VALIDATION_ERROR,
          errors,
        ),
      );
    }
    next();
  };

export { validate };
