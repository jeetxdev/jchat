import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { HTTP_STATUS } from "../constants";
import { AppError } from "../lib/AppError";
import { errorHandler } from "./errorHandler";

const sampleApp = () => {
  const app = express();
  app.get("/internalError", () => {
    throw new AppError("INTERNAL_ERROR");
  });
  app.use(errorHandler);
  return app;
};

describe("Error Handler", () => {
  const app = sampleApp();
  it("should return 500 with INTERNAL_ERROR for internal error", async () => {
    const res = await request(app).get("/internalError");
    expect(res.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.body.code).toBe("INTERNAL_ERROR");
  });
});
