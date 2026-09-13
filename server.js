import { createServer } from 'node:http';

// ponytail: in-memory fixture, swap for a real store when there is one
const products = new Map([
  ['1', { id: '1', name: 'Widget', price: 9.99 }],
]);

export const server = createServer((req, res) => {
  const id = req.url.match(/^\/products\/([^/?]+)$/)?.[1];
  const product = id && products.get(id);
  res.writeHead(product ? 200 : 404, { 'content-type': 'application/json' });
  res.end(JSON.stringify(product ?? { error: 'not found' }));
});

if (import.meta.main) server.listen(3000, () => console.log('provider on http://localhost:3000'));
