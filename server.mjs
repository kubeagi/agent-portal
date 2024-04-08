import fs from 'fs';
import https from 'https';
import next from 'next';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import url from 'url';

async function bootstrap() {
  const port = Number.parseInt(process.env.PORT, 10) || 3000;
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({
    dev,
    customServer: true,
  });
  const handle = app.getRequestHandler();

  await app.prepare();

  const oidcServerUrl = process.env.OIDC_SERVER_URL;
  if (!oidcServerUrl) {
    console.warn('The env OIDC_SERVER_URL must be configured!')
    process.exit();
  }
  const oidcUrlObj = url.parse(oidcServerUrl);
  const _url = `${oidcUrlObj.protocol}//${oidcUrlObj.host}`;
  const server = express();

  // 代理中间件配置
  const bff = '/bff';
  const api = '/kubeagi-apis';
  server.use(bff, createProxyMiddleware({
    target: _url ,
    changeOrigin: true,
    secure: false, // 关闭 SSL 证书验证
  }));
  server.use(api, createProxyMiddleware({
    target: _url,
    changeOrigin: true,
    secure: false,
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
      // eslint-disable-next-line no-console
      console.log(`> Ready on https://localhost:${port}`);
    });
  } else {
    // 在开发环境下使用 HTTP
    server.listen(port, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
}

bootstrap();
