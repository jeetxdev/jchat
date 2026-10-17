import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";
import request from "supertest";

describe("App", () => {
  const app = createApp();

  it("should be defined", () => {
    expect(app).toBeDefined();
  });
  it("should return 404 for unknown route", async () => {
    const unknownRoute = "/unknown-route";
    const res = await request(app).get(unknownRoute);
    expect(res.status).toBe(404);
  });
});
