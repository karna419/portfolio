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

## Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick this repo.
2. Framework preset **Astro**. Build command `npm run build`, output directory `dist`, production branch `main`.
3. After the first deploy: **Custom domains → Set up a custom domain** → enter your domain.
   If the domain is registered on Cloudflare, the DNS records are added for you.
4. **Analytics:** in the project, open **Metrics → Web Analytics → Enable**. Cloudflare injects the
   script itself, so there is nothing to add to the code. No cookies, so no consent banner needed.
