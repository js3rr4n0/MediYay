# Worklog – Interpreter Tracker

Single-page tracker (`index.html`) for interpreter work hours, shifts, payments,
anniversaries, U.S. holidays and Daylight Saving Time.

- Open `index.html` directly → data is saved in that browser only.
- Deploy to Vercel → data can also be saved in a Vercel database (synced across devices).

## Deploy to Vercel

1. Import this repo in Vercel (Framework preset: **Other**, no build command).
2. Deploy. The app works right away, saving in the browser.

## Add the database later

1. Vercel project → **Storage** → **Create / Connect Database** → **Neon (Postgres)** → connect it to this project.
   This adds `DATABASE_URL` automatically.
2. Vercel project → **Settings → Environment Variables** → add `APP_PASSWORD` (any password you choose).
3. Redeploy. When you open the site it asks for that password once, then saves everything to the database.
   The table (`worklog_data`) is created automatically.

Settings (⚙️) shows whether you are saving to the database or only in the browser.
If the browser already has data and the database is empty, the browser data is uploaded the first time.
