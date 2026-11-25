// Cloudflare Worker entry. The site itself is static files in dist/ (served by the ASSETS
// binding); only /api/* runs code, for the "Book a call" picker.
import type { Env } from './server/cal';
import { json } from './server/cal';
import { onRequestGet as slots } from './server/api/slots';
import { onRequestPost as book } from './server/api/book';

interface WorkerEnv extends Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);
    const ctx = { request, env };

    if (pathname === '/api/slots') {
      return request.method === 'GET' ? slots(ctx) : json({ error: 'method' }, 405, { allow: 'GET' });
    }
    if (pathname === '/api/book') {
      return request.method === 'POST' ? book(ctx) : json({ error: 'method' }, 405, { allow: 'POST' });
    }
    if (pathname.startsWith('/api/')) return json({ error: 'not_found' }, 404);

    return env.ASSETS.fetch(request);
  },
};
