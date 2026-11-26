// Shared by the Worker API routes in src/server/api. Runs on the server only:
// the Cal.com API key never reaches the browser.
import type { RateLimit } from './guard';

export interface Env {
  /** Cal.com API key (Settings → Security). Set as a Secret on the Worker in Cloudflare. */
  CAL_API_KEY?: string;
  /** Your Cal.com username, e.g. "karunagaran". */
  CAL_USERNAME?: string;
  /** Slug of the 15-minute event type. */
  CAL_EVENT_SLUG?: string;
  /** Only for local testing against a mock server. */
  CAL_API_BASE?: string;
  /** Cloudflare Turnstile public site key. Turnstile is on only when both keys are set. */
  TURNSTILE_SITE_KEY?: string;
  /** Cloudflare Turnstile secret key. Set as a Secret on the Worker in Cloudflare. */
  TURNSTILE_SECRET_KEY?: string;
  /** Rate limiters from `ratelimits` in wrangler.jsonc. */
  BOOK_LIMITER?: RateLimit;
  SLOTS_LIMITER?: RateLimit;
}

/** What each API route receives from src/worker.ts. */
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
    slug: env.CAL_EVENT_SLUG || '15min',
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
