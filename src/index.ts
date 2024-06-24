import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { PotentialServer } from '@models/potential-server.model';
import { findServer } from '@services/server-finder';

const app = express();
const PORT = process.env.PORT || 3000;

const servers: PotentialServer[] = [
  {
    url: 'https://does-not-work.perfume.new',
    priority: 1,
  },
  {
    url: 'https://gitlab.com',
    priority: 4,
  },
  {
    url: 'http://app.scnt.me',
    priority: 3,
  },
  {
    url: 'https://offline.scentronix.com',
    priority: 2,
  },
];

app.use(async (req, res, next) => {
  try {
    const bestServer = await findServer(servers);
    const proxy = createProxyMiddleware({
      target: bestServer.url,
      changeOrigin: true,
    });
    return proxy(req, res, next);
  } catch (error) {
    res.status(500).send('No servers are online');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
