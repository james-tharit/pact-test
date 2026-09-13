import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// ponytail: in-memory fixture, swap for a real store when there is one
const products = new Map([
  ['1', { id: '1', name: 'Widget', price: 9.99 }],
]);

// the browser reuses client.js, so it is served alongside the page
const assets = {
  '/': ['index.html', 'text/html'],
  '/client.js': ['client.js', 'text/javascript'],
};

export const server = createServer(async (req, res) => {
  const asset = assets[req.url];
  if (asset) {
    const [file, type] = asset;
    res.writeHead(200, { 'content-type': type });
    return res.end(await readFile(new URL(file, import.meta.url)));
  }

  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  const id = req.url.match(/^\/products\/([^/?]+)$/)?.[1];
  const product = id && products.get(id);
  res.writeHead(product ? 200 : 404, { 'content-type': 'application/json' });
  res.end(JSON.stringify(product ?? { error: 'not found' }));
});

if (import.meta.main) server.listen(3000, () => console.log('provider on http://localhost:3000'));
