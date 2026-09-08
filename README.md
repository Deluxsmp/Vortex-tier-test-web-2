# Vortex Tier — Simple Setup

A simple Vortex Tier website for Minecraft PvP rankings. It uses GitHub `data.json` as shared storage, so you do **not** need a database.

## What you need
Only **2 Vercel Environment Variables**:

- `GITHUB_TOKEN` — a GitHub token that can read/write the repository contents
- `ADMIN_PASSWORD` — the password for `/admin`

The repository is already configured for:
`Deluxsmp/Vortex-tier-test-web-2` on branch `main`.

## Deploy
1. Upload these files to the GitHub repository.
2. Import the repository into Vercel.
3. Vercel → Project Settings → Environment Variables.
4. Add `GITHUB_TOKEN` as a Secret for Production.
5. Add `ADMIN_PASSWORD` as a Secret for Production.
6. Redeploy.
7. Open `/admin` and enter the admin password.

## Admin
- Add, edit, and delete players.
- Add mode points and HT/LT tiers.
- Set mode image URLs.
- Overall points are calculated automatically.
- Player names cannot be duplicated.
- Public rankings read the same shared data.

## Local
Run `npm install` then `npm start`. Without GitHub environment variables, local development uses the included `data.json`.

## Important
Never put the GitHub token in frontend JavaScript or send it in chat. Keep it only in Vercel Environment Variables.
