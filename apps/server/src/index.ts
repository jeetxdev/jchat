import { createApp } from "./app.js";
import { API_BASE_PATH, ENV } from "./config/env.js";
import { logger } from "./lib/logger.js";

createApp().listen(ENV.PORT, () => {
  logger.info(`jChat API listening on http://localhost:${ENV.PORT}${API_BASE_PATH}`);
});
