export const DEFAULT_PORT = 3001;

// Namespace for every API route, kept separate from the version so proxy and
// cache rules can match `/api/*` once and survive future versions.
export const API_PREFIX = '/api';
export const API_VERSION = 'v1';
export const API_BASE_PATH = `${API_PREFIX}/${API_VERSION}`;

export const PORT = Number(process.env.PORT) || DEFAULT_PORT;
