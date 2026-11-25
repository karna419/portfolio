# Working on this site

## Going live

Cloudflare deploys the site from `main`. The owner wants finished changes live without being
asked each time:

- Build first (`npm run build`) and check the change works.
- Commit on the session's working branch, push it, then fast-forward `main` to it and push `main`.
- Only fast-forward. If `main` has moved and a fast-forward is not possible, stop and ask.
- If the owner says not to go live for a change, push the working branch only.
