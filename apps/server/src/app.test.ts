import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";
import request from "supertest";
import { ERROR_CODES, HTTP_STATUS } from "./constants/index.js";

describe("App", () => {
  const app = createApp();

  it("should be defined", () => {
    expect(app).toBeDefined();
  });
  it("should return 404 with ROUTE_NOT_FOUND for unknown route", async () => {
    const unknownRoute = "/unknown-route";
    const res = await request(app).get(unknownRoute);
    expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
    expect(res.body.code).toBe(ERROR_CODES.ROUTE_NOT_FOUND);
  });
});
