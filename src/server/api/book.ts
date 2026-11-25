// POST /api/book  { start, name, email, notes?, timeZone, website? }
// Books the 15-minute call. Cal.com sends both sides the calendar invite and meeting link.
import { config, isTimeZone, json, WINDOW_DAYS, type Context } from '../cal';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function onRequestPost({ request, env }: Context) {
  const cal = config(env);
  if (!cal) return json({ error: 'not_configured' }, 503);

  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  const str = (k: string) => (typeof input[k] === 'string' ? (input[k] as string).trim() : '');

  // Honeypot: a hidden field people never see. Bots fill it; pretend it worked.
  if (str('website')) return json({ ok: true });

  const name = str('name');
  const email = str('email');
  const notes = str('notes');
  const timeZone = str('timeZone') || 'UTC';
  const start = new Date(str('start'));

  const now = Date.now();
  if (!name || name.length > 100) return json({ error: 'name' }, 400);
  if (!EMAIL.test(email) || email.length > 200) return json({ error: 'email' }, 400);
  if (notes.length > 1000) return json({ error: 'notes' }, 400);
  if (!isTimeZone(timeZone)) return json({ error: 'bad_time_zone' }, 400);
  if (isNaN(start.getTime()) || start.getTime() < now || start.getTime() > now + (WINDOW_DAYS + 1) * 86_400_000) {
    return json({ error: 'start' }, 400);
  }

  const res = await fetch(`${cal.base}/v2/bookings`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'cal-api-version': '2026-02-25',
      authorization: `Bearer ${cal.key}`,
    },
    body: JSON.stringify({
      start: start.toISOString(),
      eventTypeSlug: cal.slug,
      username: cal.username,
      attendee: { name, email, timeZone, language: 'en' },
      ...(notes ? { bookingFieldsResponses: { notes } } : {}),
      metadata: { source: 'portfolio' },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('Cal.com booking failed', res.status, detail);
    // Usually someone else just took the slot.
    return json({ error: res.status === 400 || res.status === 409 ? 'slot_taken' : 'upstream' }, res.status === 409 ? 409 : 502);
  }

  const body = (await res.json()) as { data?: { uid?: string; start?: string; location?: string } };
  const location = body.data?.location;
  return json({
    ok: true,
    start: body.data?.start ?? start.toISOString(),
    // Cal.com returns the meeting link here once the video app has created it.
    meetingUrl: location && /^https?:\/\//.test(location) ? location : null,
  });
}
