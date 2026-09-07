# Vortex Tier V28 — Full Site + Private Admin

## Included
- Public Home + Rankings pages.
- Private `/admin` dashboard protected by session login.
- SQLite persistent database.
- Add/edit/delete players.
- Optional custom skin URL; empty URL automatically uses the Minecraft username skin. If that image fails, Steve is used as a final fallback.
- Per-mode **points + HT/LT tier** for Vanilla, UHC, Pot, NetHop, SMP, Sword, Axe and Mace.
- HT1/LT1 go to Tier 1, HT2/LT2 to Tier 2, ... HT5/LT5 to Tier 5 automatically.
- Untested mode = blank tier and no icon/rank value in the player card/modal.
- Overall points are automatically calculated from tested mode points and players are sorted automatically.
- Overall title: #1 Combat Grandmaster, #2–3 Combat Master, #4+ Combat Ace.
- Click any public player row to open the detailed modal with the same per-mode tiers/points.
- Admin can set image URLs for every mode icon without changing code.

## Start locally
1. Install Node.js 18+.
2. Copy `.env.example` to `.env` and set a long random `SESSION_SECRET` for deployment.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000` for the public site.
6. Open `http://localhost:3000/admin` for the private panel.

The requested initial admin login is configured from `.env` with:
- Email: `dhrhbodhrubo282@gmail.com`
- Password: `@dhrubo2a`

The password is converted to a bcrypt hash on first startup and the plain password is not stored in SQLite. After first login, change it from **Security**.

## Important deployment note
This project uses a local SQLite file (`vortex.db`), so deploy it on a host with persistent disk/storage. A stateless serverless filesystem is not suitable for the database unless you replace SQLite with a managed database.
