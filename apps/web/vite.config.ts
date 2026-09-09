import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Matches `/api`, not `/api/v1`, so future API versions proxy without changes.
const API_PREFIX = "/api";
const API_PROXY_TARGET = "http://localhost:3001";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      [API_PREFIX]: {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
