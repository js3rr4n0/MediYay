# Worklog – Interpreter Tracker

Single-page tracker (`index.html`) for interpreter work hours, shifts, payments,
anniversaries, U.S. holidays and Daylight Saving Time.

- Open `index.html` directly → data is saved in that browser only.
- Deploy to Vercel → data can also be saved in a Vercel database (synced across devices).

## Deploy to Vercel

1. Import this repo in Vercel (Framework preset: **Other**, no build command).
2. Deploy. The app works right away, saving in the browser.

## Database

1. Vercel project → **Storage** → **Neon (Postgres)** → connect it to this project (adds `DATABASE_URL`).
2. Redeploy. The table (`worklog_data`) is created automatically on first use.

There is no password: anyone with the site link can see and edit the data.
Settings (⚙️) shows whether you are saving to the database or only in the browser.
If the browser already has data and the database is empty, the browser data is uploaded the first time.
