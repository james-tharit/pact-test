import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PactV4, MatchersV3 } from '@pact-foundation/pact';
import { getProduct } from '../client.js';
const pact = new PactV4({
  consumer: 'ProductWebClient',
  provider: 'ProductApi',
  dir: new URL('../pacts', import.meta.url).pathname,
});

test('GET /products/1 returns a product', () =>
  pact
    .addInteraction()
    .given('a product with id 1 exists')
    .uponReceiving('a request for product 1')
    .withRequest('GET', '/products/1', (b) => b.headers({ Accept: 'application/json' }))
    .willRespondWith(200, (b) =>
      b.jsonBody({
        id: MatchersV3.string('1'),
        name: MatchersV3.string('Widget'),
        price: MatchersV3.decimal(9.99),
      }),
    )
    .executeTest(async (mock) => {
      const product = await getProduct(mock.url, '1');
      assert.equal(product.id, '1');
      assert.equal(typeof product.price, 'number');
    }));
