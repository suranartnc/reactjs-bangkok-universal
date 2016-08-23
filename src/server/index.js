import config from 'shared/configs'
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import ssr from './ssr';

const targetUrl = `http://${config.apiHost}${config.apiPort !== 80 ? `:${config.apiPort}` : ''}`;
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

const app = express();
app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')));
app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

proxy.on('error', (error, req, res) => {
  const json = {error: 'proxy_error', reason: error.message};
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  res.end(JSON.stringify(json));
});

app.use(ssr);

app.listen(config.port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Web server listening on ${config.host}:${config.port}`);
});