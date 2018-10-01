// @ts-check

import http from 'http';

import polka from 'polka';
import send from '@polka/send-type';
import cors from 'cors';
import fetch from 'node-fetch';
import uuid from 'uuid/v4';

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

app.get('/form', async (req, res) => {
  const csrf = uuid();
  const html_form = await html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Form</title>
      </head>
      <body>
        <div id="user-submission">
          <form action="form-submission" method="post" enctype="application/x-www-form-urlencoded" >
            <fieldset>
              <label for="firstName">First Name:</label>
              <input type="text" name="firstName" />

              <label for="lastName">Last Name:</label>
              <input type="text" name="lastName" />

              <label for="dob">Date of Birth:</label>
              <input type="text" name="dob" />

              <label for="email">email:</label>
              <input type="text" name="email" />

              <label for="gender">Gender:</label>
              <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input type="hidden" id="_csrf" name="_csrf" value="${csrf}" />

              <input type="submit" value="Submit" />
            </fieldset>
          </form>
        </div>
      </body>
    </html>
  `;

  send(res, 200, html_form, { 'Content-Type': 'text/html' });

});

app.post('/form-submission', (req, res) => {
  const { firstName, lastName, dob, email, gender, _csrf } = req.query;

  res.end("txt form submitted successfully");
});

app
  .listen(PORT)
  .then(() => {
    console.info(`Polka running at port ${PORT}...`)
  });
