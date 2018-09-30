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
app.post('/mocky-api', function (req, res) {
  // TODO: Refactor to use ES2015+, fat arrow function, and async...await
  var url = 'http://www.mocky.io/v2/5b60920b2f00008e364619ee?mocky-delay=' + Math.floor(Math.random() * 3e3) + 'ms';
  
  return fetch(url, {
    timeout: 10e3,
    agent: new http.Agent({ keepAlive: true }),
  })
    .then(function (r) {
      if (!r.ok || r.status > 399) {
        throw new Error('Fetch error');
      }
    
      return r.json();
    })
    .then(function (d) {
      return send(res, 200, d);
    })
    .catch(function (e) {
      console.error('Unable to fetch', e);
    
      return send(
        res,
        500,
        { error: { message: e.message } },
        { 'Content-Type': 'application/json' });
    });
});
app.post('/data', (req, res) => {
  // TODO: Refactor so that uid can be string or an array of strings
  const { uid } = req.query;
  var uid_arr = uid.split(',').map(s => +s.trim());
  const d = users.users.filter(n => uid_arr.includes(n.id));
  
  return send(res, 200, d, { 'Content-Type': 'application/json' });
});
app.get('/', async (_, res) => {
  const msg = 'Hello, World!';
  const d = await html`<h1>${msg}</h1>`;
  
  return send(res, 200, d, { 'Content-Type': 'text/html' });
});

app
  .listen(PORT)
  .then(() => {
    console.info(`Polka running at port ${PORT}...`)
  });
