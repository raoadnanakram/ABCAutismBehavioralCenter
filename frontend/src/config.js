// Backend (GoDaddy Node app) base URL.
// Production: set VITE_API_URL in frontend/.env.production  (no trailing slash)
// Local dev : falls back to http://localhost:5000
export const API_BASE = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000' : '')
).replace(/\/+$/, '');

// false while frontend/.env.production still has the placeholder URL
export const API_READY = !API_BASE.includes('PUT-YOUR');
