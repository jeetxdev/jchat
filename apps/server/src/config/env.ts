import { z } from "zod";

const DEFAULT_PORT = 3001;
const DEFAULT_DB_POOL_MAX = 10;

const ENV_CONFIG = z.object({
  PORT: z.coerce.number().default(DEFAULT_PORT),
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string(),
  DATABASE_URL_POOLED: z.string(),
  DB_POOL_MAX: z.coerce.number().min(1).default(DEFAULT_DB_POOL_MAX),
  JWT_SECRET: z.string(),
  LOG_LEVEL: z.string().optional(),
});
const envConfig = ENV_CONFIG.safeParse(process.env);

if (!envConfig.success) {
  console.error(envConfig.error);
  process.exit(1);
}

// Namespace for every API route, kept separate from the version so proxy and
// cache rules can match `/api/*` once and survive future versions.
export const API_PREFIX = "/api";
export const API_VERSION = "v1";
export const API_BASE_PATH = `${API_PREFIX}/${API_VERSION}`;

export const ENV = envConfig.data;
