import fs from 'fs';
import https from 'https';
import next from 'next';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import url from 'url';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const bff = '/bff';
const api = '/kubeagi-apis';

app.prepare().then(() => {
  const oidcUrlObj = url.parse(process.env.OIDC_SERVER_URL);
  const _url = `${oidcUrlObj.protocol}//${oidcUrlObj.host}${oidcUrlObj.port ? `:${oidcUrlObj.port}` : ''}`;
  const server = express();
  // 保持代理中间件配置
  server.use(bff, createProxyMiddleware({
    target: _url + bff ,
    changeOrigin: true,
    secure: false, // 关闭 SSL 证书验证
  }));

  server.use(api, createProxyMiddleware({
    target: _url + api,
    changeOrigin: true,
    secure: false, // 关闭 SSL 证书验证
  }));

  // 处理其他所有请求
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // PWA 测试时, 使用自签名证书, 开启HTTPS
  if (process.env.PWA === 'true') {
    // 在非开发环境下使用 HTTPS
    https.createServer({
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    }, server).listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}`);
    });
  } else {
    // 在开发环境下使用 HTTP
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});