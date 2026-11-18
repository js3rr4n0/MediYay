// Vercel serverless function: stores the whole Worklog state as one JSON row in Postgres.
// Works with any Postgres from Vercel → Storage (Neon). Needs these environment variables:
//   DATABASE_URL (or POSTGRES_URL) – added automatically when you connect the database
// No password: anyone with the site link can read and change the data.
import { neon } from '@neondatabase/serverless';

const ROW_ID = 'default';
const MAX_BYTES = 4_000_000;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) {
    return res.status(503).json({ error: 'No database connected yet (Vercel → Storage).' });
  }

  try {
    const sql = neon(dbUrl);
    await sql`create table if not exists worklog_data (
      id text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )`;

    if (req.method === 'GET') {
      const rows = await sql`select data from worklog_data where id = ${ROW_ID}`;
      return res.status(200).json({ data: rows[0]?.data ?? null });
    }

    if (req.method === 'PUT') {
      const data = req.body && req.body.data;
      if (!data || typeof data !== 'object' || !data.settings || !data.days) {
        return res.status(400).json({ error: 'Invalid data.' });
      }
      const json = JSON.stringify(data);
      if (json.length > MAX_BYTES) return res.status(413).json({ error: 'Data too large.' });
      await sql`insert into worklog_data (id, data, updated_at)
                values (${ROW_ID}, ${json}::jsonb, now())
                on conflict (id) do update set data = excluded.data, updated_at = now()`;
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error.' });
  }
}
