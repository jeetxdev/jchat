import { defineConfig } from "vitest/config";

const TEST_DATABASE_URL = "postgresql://test:test@localhost:5432/jchat_test";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    env: {
      NODE_ENV: "development",
      DATABASE_URL: TEST_DATABASE_URL,
      DATABASE_URL_POOLED: TEST_DATABASE_URL,
      JWT_SECRET: "test-only-secret",
      LOG_LEVEL: "silent",
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts"],
      reporter: ["text", "html"],
    },
  },
});
