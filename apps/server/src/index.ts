import express from "express";
import { API_BASE_PATH, ENV } from "./config.js";
import { healthRouter } from "./routes/health.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(API_BASE_PATH, healthRouter);

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`jChat API listening on http://localhost:${ENV.PORT}${API_BASE_PATH}`);
});
