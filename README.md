# karunagaran — portfolio

Personal site built with [Astro](https://astro.build) and Tailwind CSS. Static output. It is styled like a native iOS app: a fixed wallpaper with panes of translucent glass over it (`.glass` in `src/styles/global.css`), set in the system font. The only JavaScript is the dark-mode toggle, the tab bar, the booking widget and the hero phone (`src/components/Phone.astro`), which shows the shipped apps, Chennai time and the contact links.

## Run it

```sh
npm install
npm run dev       # http://localhost:4321 — drafts are visible here
npm run build     # production build into dist/ — drafts are left out
npm run preview   # serve the production build locally
```

No accounts or keys are needed to run it. The only optional extra is the "Book a call" picker
(below); without it, the button simply stays hidden.

## Make it your own

Fork the repo, then replace my details with yours:

1. `src/site.ts`: name, intro, email, links, about text, stack, `summary` and `expertise` (how search engines and AI assistants describe you), and `source` (your fork's URL, or empty to hide the footer link).
2. `src/content/work/`: delete my projects and add yours (one Markdown file each), with icons in `public/work/`.
3. `src/data/reviews.ts`: your client reviews, or an empty list to hide the section.
4. `astro.config.mjs`: your domain in `site`.
5. `src/components/Booker.astro` and `Phone.astro`: they show Chennai time; change the home time zone there.
6. To host it on Cloudflare, change `name` in `wrangler.jsonc` to your Worker's name (see Deploy below).

## Licence

The **code** is free to use under the [MIT licence](LICENSE): clone it, change it, use it for
your own site or for client work. Keep the licence notice in your copy.

The **content** is not covered by that licence and stays mine: my name, intro and about text,
the case studies in `src/content/work/`, the client reviews in `src/data/reviews.ts`, and the
images in `public/` (the app icons belong to the clients). When you fork, replace them with your
own as described above.

## Edit your details

- **Name, intro, email, links, CV:** `src/site.ts`
- **Projects:** one Markdown file per project in `src/content/work/`. Copy an existing one, such as `eurostruct.md`, and change it.
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

To test locally, copy `.dev.vars.example` to `.dev.vars`, fill it in, then run
`npm run build && npx wrangler dev`. Git ignores `.dev.vars`; never put the key anywhere else in the repo.
