const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:4000';

app.use(express.static(path.join(__dirname, 'public')));

// Proxy API calls to backend (keeps CORS simple)
app.use('/api', async (req, res) => {
  const url = BACKEND_URL + req.originalUrl;
  const opts = {
    method: req.method,
    headers: { ...req.headers }
  };
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      opts.body = JSON.stringify(req.body);
      opts.headers['content-type'] = 'application/json';
    }
    const r = await fetch(url, opts);
    const text = await r.text();
    res.status(r.status);
    const ct = r.headers.get('content-type');
    if (ct) res.set('content-type', ct);
    res.send(text);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Frontend on ${PORT}, proxy -> ${BACKEND_URL}`));
