import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { API_BASE_PATH } from "../config/env.js";
const HEALTH_CHECK_PATH = `${API_BASE_PATH}/health`;

describe("Health Check", () => {
  const app = createApp();
  it("should return 200", async () => {
    const res = await request(app).get(HEALTH_CHECK_PATH);
    expect(res.status).toBe(200);
  });

  it("should return uptime as a number", async () => {
    const res = await request(app).get(HEALTH_CHECK_PATH);
    expect(typeof res.body.data.uptime).toBe("number");
  });
});
