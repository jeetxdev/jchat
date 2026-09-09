import express from 'express';
import { API_BASE_PATH, PORT } from './config.js';
import { healthRouter } from './routes/health.js';

const app = express();

app.use(express.json());
app.use(API_BASE_PATH, healthRouter);

app.listen(PORT, () => {
  console.log(`jChat API listening on http://localhost:${PORT}${API_BASE_PATH}`);
});
