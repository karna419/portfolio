// Abuse protection for the booking API: rate limits and Cloudflare Turnstile.
// Both are optional, so a fork with no setup still works:
// - Rate limits come from the `ratelimits` bindings in wrangler.jsonc. No secret is needed.
// - Turnstile is on only when both TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY are set.
import type { Env } from './cal';

/** The Workers rate-limit binding. */
export interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

/** The visitor's IP as Cloudflare saw it. */
export const clientIp = (request: Request) => request.headers.get('cf-connecting-ip') ?? 'unknown';

/** True if every key is under its limit. Returns true when there is no binding (e.g. a bare fork). */
export async function allowed(limiter: RateLimit | undefined, ...keys: string[]) {
  if (!limiter) return true;
  for (const key of keys) {
    if (!(await limiter.limit({ key })).success) return false;
  }
  return true;
}

/** The public site key, only when Turnstile is fully set up. The browser gets this. */
export const turnstileSiteKey = (env: Env) =>
  env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY ? env.TURNSTILE_SITE_KEY : null;

/**
 * Checks the token the Turnstile widget gave the browser. Returns true when Turnstile isn't set up.
 * Each token works once and expires after five minutes.
 */
export async function humanVerified(env: Env, request: Request, token: string) {
  if (!turnstileSiteKey(env)) return true;
  if (!token || token.length > 2048) return false;

  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET_KEY!);
  form.append('response', token);
  form.append('remoteip', clientIp(request));
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    // The widget only runs on the hostnames listed for the site key in the Turnstile dashboard,
    // so a token solved on another site fails here. (Hostname isn't re-checked in code because
    // Cloudflare's test keys, used for local testing, report a placeholder hostname.)
    const out = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!out.success) console.warn('Turnstile rejected a booking', out['error-codes']);
    return out.success === true;
  } catch (err) {
    console.error('Turnstile check failed', err);
    return false;
  }
}
