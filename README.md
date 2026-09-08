# Vortex Tier

Clean Minecraft PvP tier-list website with a private admin panel.

## Vercel setup
Only two environment variables are required:

- `GITHUB_TOKEN` — GitHub Fine-grained token with **Contents: Read and write** for `Deluxsmp/Vortex-tier-test-web-2`.
- `ADMIN_PASSWORD` — your private admin password.

Add both to **Production**, then redeploy.

Public pages:
- `/`
- `/rankings`

Private admin:
- `/admin`

The GitHub token is used only by the server-side API and is never sent to browser JavaScript.

## Local development
1. `npm install`
2. Copy `.env.example` to `.env` and set the two values.
3. `npm start`
4. Open `http://localhost:3000`
