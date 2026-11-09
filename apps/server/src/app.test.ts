import { describe, expect, it } from "vitest";
import { createApp } from "./app";
import request from "supertest";
import { HTTP_STATUS } from "./constants";

describe("App", () => {
  const app = createApp();

  it("should be defined", () => {
    expect(app).toBeDefined();
  });
  it("should return 404 with ROUTE_NOT_FOUND for unknown route", async () => {
    const unknownRoute = "/unknown-route";
    const res = await request(app).get(unknownRoute);
    expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
    expect(res.body.code).toBe("ROUTE_NOT_FOUND");
  });
});
