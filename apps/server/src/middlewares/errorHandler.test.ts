import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../constants/index.js";
import { AppError } from "../lib/AppError.js";
import { errorHandler } from "./errorHandler.js";

const sampleApp = () => {
  const app = express();
  app.get("/internalError", () => {
    throw new AppError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    );
  });
  app.use(errorHandler);
  return app;
};

describe("Error Handler", () => {
  const app = sampleApp();

  it("should return 500 for internal error", async () => {
    const res = await request(app).get("/internalError");
    expect(res.body.code).toBe(ERROR_CODES.INTERNAL_SERVER_ERROR);
  });
});
