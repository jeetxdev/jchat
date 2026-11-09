import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../app";
import { API_BASE_PATH } from "../config/env";
import { pool } from "../db";

const HEALTH_CHECK_PATH = `${API_BASE_PATH}/health`;

vi.mock("../db", () => ({
  pool: {
    query: vi.fn().mockResolvedValue({
      rows: [
        {
          "?column?": 1,
        },
      ],
    }),
  },
}));
describe("Health Check API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const app = createApp();
  it("should return 200", async () => {
    const res = await request(app).get(HEALTH_CHECK_PATH);
    expect(res.status).toBe(200);
  });

  it("should return uptime as a number", async () => {
    const res = await request(app).get(HEALTH_CHECK_PATH);
    expect(typeof res.body.data.uptime).toBe("number");
  });

  it("should return DB status as true when db connection is successful", async () => {
    const res = await request(app).get(HEALTH_CHECK_PATH);
    expect(res.body.data.db).toBe(true);
  });

  it("should return error when db connection fails", async () => {
    vi.mocked(pool.query).mockRejectedValueOnce(new Error("DB_CONNECTION_ERROR"));
    const res = await request(app).get(HEALTH_CHECK_PATH);
    expect(res.status).toBe(503);
    expect(res.body.code).toBe("DB_CONNECTION_ERROR");
  });
});
