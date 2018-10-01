// @ts-check

import http from 'http';

import polka from 'polka';
import send from '@polka/send-type';
import cors from 'cors';
import fetch from 'node-fetch';

import html from './html.js';
import users from './users.js';

const PORT = process.env.PORT;
const app = polka();

app.use(cors());

app.get('/healthcheck', (_, res) => res.end('OK'));
app.post('/mocky-api', async (req, res) => {
  const url = 'http://www.mocky.io/v2/5b60920b2f00008e364619ee?mocky-delay=' + Math.floor(Math.random() * 3e3) + 'ms';
  
  try {
      let response = await fetch(url, {
        timeout: 10e3,
        agent: new http.Agent({ keepAlive: true }),
      });

      if (!response.ok || response.status > 300) {
          throw new Error('Fetch error');
      }

      let d = await response.json();
      send(res, 200, d);

  } catch(e) {
      console.error('Unable to fetch', e);
    
      return send(
        res,
        500,
        { error: { message: e.message } },
        { 'Content-Type': 'application/json' });
  }
});
app.post('/data', (req, res) => {
  const { uid } = req.query;
  const uid_arr = uid.split(',').map(s => +s.trim());
  const d = users.users.filter(n => uid_arr.includes(n.id));
  
  return send(res, 200, d, { 'Content-Type': 'application/json' });
});
app.get('/', async (_, res) => {
  const msg = 'Hello, World!';
  const d = await html`<h1>${msg}</h1>`;
  
  return send(res, 200, d, { 'Content-Type': 'text/html' });
});
app.post('/form', 

app
  .listen(PORT)
  .then(() => {
    console.info(`Polka running at port ${PORT}...`)
  });
