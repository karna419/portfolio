// Shared by the Cloudflare Pages Functions in /functions/api. Runs on the server only:
// the Cal.com API key never reaches the browser.

export interface Env {
  /** Cal.com API key (Settings → Security). Set as an encrypted variable in Cloudflare. */
  CAL_API_KEY?: string;
  /** Your Cal.com username, e.g. "karunagaran". */
  CAL_USERNAME?: string;
  /** Slug of the 20-minute event type. */
  CAL_EVENT_SLUG?: string;
  /** Only for local testing against a mock server. */
  CAL_API_BASE?: string;
}

/** Minimal shape of a Pages Function context, so no extra type package is needed. */
export interface Context {
  request: Request;
  env: Env;
}

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });

export function config(env: Env) {
  if (!env.CAL_API_KEY || !env.CAL_USERNAME) return null;
  return {
    key: env.CAL_API_KEY,
    username: env.CAL_USERNAME,
    slug: env.CAL_EVENT_SLUG || '20min',
    base: (env.CAL_API_BASE || 'https://api.cal.com').replace(/\/$/, ''),
  };
}

/** Bookings are offered this many days ahead. */
export const WINDOW_DAYS = 21;

export function isTimeZone(tz: string) {
  try {
    new Intl.DateTimeFormat('en', { timeZone: tz });
    return tz.length <= 64;
  } catch {
    return false;
  }
}
