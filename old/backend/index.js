const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  user: process.env.POSTGRES_USER || 'devops',
  password: process.env.POSTGRES_PASSWORD || 'devops_pass',
  database: process.env.POSTGRES_DB || 'devopsdb',
  port: Number(process.env.POSTGRES_PORT || 5432),
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}
initDB().catch(err => {
  console.error('Failed to init DB:', err);
  process.exit(1);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/messages', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, text, created_at FROM messages ORDER BY id DESC LIMIT 50;');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/messages', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });
  try {
    const { rows } = await pool.query('INSERT INTO messages (text) VALUES ($1) RETURNING id, text, created_at;', [text]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
