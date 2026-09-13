import { test } from 'node:test';
import { readdirSync } from 'node:fs';
import { Verifier } from '@pact-foundation/pact';
import { server } from '../server.js';

const pactsDir = new URL('../pacts/', import.meta.url);

test('provider honours every consumer contract', async () => {
  await new Promise((r) => server.listen(0, r));
  try {
    await new Verifier({
      provider: 'ProductApi',
      providerBaseUrl: `http://127.0.0.1:${server.address().port}`,
      // every consumer's contract, so a new consumer needs no change here
      pactUrls: readdirSync(pactsDir).map((f) => new URL(f, pactsDir).pathname),
      // ponytail: fixtures are static, so states need no setup — seed here when they don't
      stateHandlers: {
        'a product with id 1 exists': () => {},
        'healthy server': () => {},
      },
    }).verifyProvider();
  } finally {
    server.close();
  }
});
