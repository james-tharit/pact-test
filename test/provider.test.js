import { test } from 'node:test';
import { Verifier } from '@pact-foundation/pact';
import { server } from '../server.js';

test('provider honours the ProductWebClient contract', async () => {
  await new Promise((r) => server.listen(0, r));
  try {
    await new Verifier({
      provider: 'ProductApi',
      providerBaseUrl: `http://127.0.0.1:${server.address().port}`,
      pactUrls: [new URL('../pacts/ProductWebClient-ProductApi.json', import.meta.url).pathname],
      // ponytail: fixtures are static, so states need no setup — seed here when they don't
      stateHandlers: { 'a product with id 1 exists': () => {} },
    }).verifyProvider();
  } finally {
    server.close();
  }
});
