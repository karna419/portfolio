// GET /api/slots?timeZone=Europe/Berlin
// Free 15-minute slots for the next few weeks, grouped by day in the time zone the visitor chose.
import { config, isTimeZone, json, WINDOW_DAYS, type Context } from '../cal';
import { allowed, clientIp, turnstileSiteKey } from '../guard';

export async function onRequestGet({ request, env }: Context) {
  const cal = config(env);
  if (!cal) return json({ error: 'not_configured' }, 503);

  // Each call spends the Cal.com key's quota, so scripts can't hammer it.
  if (!(await allowed(env.SLOTS_LIMITER, `ip:${clientIp(request)}`))) {
    return json({ error: 'rate_limited' }, 429, { 'retry-after': '60' });
  }

  const url = new URL(request.url);
  const tz = url.searchParams.get('timeZone') || 'UTC';
  if (!isTimeZone(tz)) return json({ error: 'bad_time_zone' }, 400);

  const start = new Date();
  const end = new Date(start.getTime() + WINDOW_DAYS * 86_400_000);
  const q = new URLSearchParams({
    eventTypeSlug: cal.slug,
    username: cal.username,
    start: start.toISOString(),
    end: end.toISOString(),
    timeZone: tz,
  });

  const res = await fetch(`${cal.base}/v2/slots?${q}`, {
    headers: { 'cal-api-version': '2024-09-04', authorization: `Bearer ${cal.key}` },
  });
  if (!res.ok) {
    console.error('Cal.com slots failed', res.status, await res.text());
    return json({ error: 'upstream' }, 502);
  }

  const body = (await res.json()) as { data?: Record<string, (string | { start: string })[]> };
  // Normalise to { "2026-12-01": ["2026-12-01T09:00:00.000+01:00", ...] }.
  const days: Record<string, string[]> = {};
  for (const [day, slots] of Object.entries(body.data ?? {})) {
    const starts = slots.map((s) => (typeof s === 'string' ? s : s.start)).filter(Boolean);
    if (starts.length) days[day] = starts;
  }

  // Short cache: fresh enough that taken slots disappear quickly.
  // The Turnstile site key is public; the page needs it to draw the check. Null when it's off.
  return json({ days, turnstile: turnstileSiteKey(env) }, 200, { 'cache-control': 'public, max-age=60' });
}
