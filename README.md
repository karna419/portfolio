# karunagaran — portfolio

Personal site built with [Astro](https://astro.build) and Tailwind CSS. Static output. The only JavaScript is the dark-mode toggle and the three.js neural-network background (`src/scripts/neural-bg.ts`), which loads after the page.

## Run it

```sh
npm install
npm run dev       # http://localhost:4321 — drafts are visible here
npm run build     # production build into dist/ — drafts are left out
npm run preview   # serve the production build locally
```

## Edit your details

- **Name, intro, email, links, CV:** `src/site.ts`
- **Projects:** one Markdown file per project in `src/content/work/`. Copy `example-project.md`.
  Projects with `draft: true` only show while running `npm run dev`.
- **Images:** put them in `public/` (e.g. `public/work/`) and link them as `/work/file.png`.
- **CV:** drop the PDF in `public/` and set `cv: '/your-file.pdf'` in `src/site.ts`.
- **Colours and fonts:** `src/styles/global.css` (the `@theme` block).
- **Domain:** update `site` in `astro.config.mjs` once the domain is live.

## Deploy on Cloudflare (Workers)

The site is the `portofolio` Worker: every push to `main` builds (`npm run build`) and deploys
(`npx wrangler deploy`, configured by `wrangler.jsonc`). The notes below are from the original Pages setup.

### Original Pages setup

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick this repo.
2. Framework preset **Astro**. Build command `npm run build`, output directory `dist`, production branch `main`.
3. After the first deploy: **Custom domains → Set up a custom domain** → enter your domain.
   If the domain is registered on Cloudflare, the DNS records are added for you.
4. **Analytics:** in the project, open **Metrics → Web Analytics → Enable**. Cloudflare injects the
   script itself, so there is nothing to add to the code. No cookies, so no consent banner needed.

## "Book a call" (Cal.com)

The contact panel has a 15-minute call picker drawn by the site. Cal.com does the calendar work
(free/busy, invites, meeting link) behind a small Worker route (`src/worker.ts` → `src/server/api/`),
so the API key never reaches the browser. Until it's configured, the picker stays hidden.

1. Make a free account at cal.com, connect your calendar and a video app (Google Meet or Zoom).
2. Create an event type: 15 minutes, slug `15min`, with your working hours.
3. Settings → Security → create an API key.
4. Cloudflare → Workers & Pages → **portofolio → Settings → Variables and Secrets**:
   - `CAL_API_KEY` (type **Secret**): the key from step 3
   - `CAL_USERNAME`: your Cal.com username
   - `CAL_EVENT_SLUG`: only if the slug isn't `15min`
   Saving them redeploys the Worker; the picker appears once `/api/slots` answers.

Test locally with `npm run build && npx wrangler dev --var CAL_API_KEY:... --var CAL_USERNAME:...`.
