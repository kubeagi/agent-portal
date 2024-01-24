import fs from 'fs';
import https from 'https';
import next from 'next';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  https.createServer({
    // key: fs.readFileSync('./cert/cert.key'),
    // cert: fs.readFileSync('./cert/cert.crt'),
    // key: fs.readFileSync('./cert/key.pem'),
    // cert: fs.readFileSync('./cert/cert.pem'),
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
  }, (req, res) => {
    handle(req, res);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});