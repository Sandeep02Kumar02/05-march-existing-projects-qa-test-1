const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// Suppress Express's default `X-Powered-By: Express` response header so the
// running server does not advertise its framework (AAP §0.7.3 — "Express's
// default behavior on the two specified routes does not expose ... framework
// metadata to clients"). `app.disable(...)` is an Express configuration call,
// not middleware, so it stays inside Rule R-6's minimal-pattern boundary.
app.disable('x-powered-by');

// Enable strict and case-sensitive routing so that ONLY the exact paths
// `GET /` and `GET /good-evening` return 200; any case variant (e.g.
// `/Good-Evening`) or trailing-slash variant (e.g. `/good-evening/`) falls
// through to Express's default 404 handler. This enforces the F-002 contract
// (AAP §0.4.4: "only `GET /` and `GET /good-evening` are served. All other
// requests receive Express's default 404"). These calls are app settings,
// not middleware — Rule R-6 is preserved. Settings must be applied before
// route registration so they take effect during route matching.
app.set('case sensitive routing', true);
app.set('strict routing', true);

app.get('/', (req, res) => {
  res.type('text/plain').status(200).send('Hello, World!\n');
});

app.get('/good-evening', (req, res) => {
  res.type('text/plain').status(200).send('Good evening\n');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
