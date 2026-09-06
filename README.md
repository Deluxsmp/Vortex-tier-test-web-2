# Vortex Tier — Minecraft PvP Tierlist

A responsive, dark, premium-style Minecraft PvP tierlist website inspired by the layout ideas in your screenshots, but implemented from scratch.

## Files
- `index.html` — page structure
- `styles.css` — responsive UI
- `app.js` — modes, players, search, tier rendering and player modal

## Run
Just open `index.html` in a browser.

For Vercel/Netlify/GitHub Pages, upload the three files as a static site.

## Customize
Open `app.js` and edit the `players` object.
Each player uses:
`["Username", points, tierNumber, "Region"]`

Add real data from your own tester/database later.

## Important
The skin avatars use the public `mc-heads.net` image endpoint at runtime. If you want completely self-hosted images, download/store your own avatar assets and change the `avatar()` function.
