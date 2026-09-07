# Vortex Tier V31

Vortex Tier now uses a shared `data.json` stored in GitHub, so changes made in the private Admin Panel can be seen by normal visitors after the public page reloads. No database is required.

## Deploy on Vercel
1. Upload this project to GitHub.
2. Import it into Vercel.
3. In Vercel Project Settings → Environment Variables add:
   - `GITHUB_REPO` = repository containing `data.json` (example `username/vortex-tier-data`)
   - `GITHUB_BRANCH` = `main`
   - `GITHUB_TOKEN` = a GitHub token with permission to read/write repository contents
   - `ADMIN_EMAIL` = your admin email
   - `ADMIN_PASSWORD` = your admin password
   - `SESSION_SECRET` = a long random secret
4. Redeploy.
5. Open `/admin` to manage players.

The GitHub token is server-side only and is never sent to visitors.

## Local test
`npm install` then `npm start`.

## Important
A shared public ranking needs persistent shared storage somewhere. This edition avoids a database by using GitHub's `data.json`. It cannot provide shared updates using only browser localStorage.
