import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PactV4, MatchersV3 } from '@pact-foundation/pact';
import { productLabel } from '../inventory.js';

const pact = new PactV4({
  consumer: 'InventoryReport',
  provider: 'ProductApi',
  dir: new URL('../pacts', import.meta.url).pathname,
});

test('product label uses only id and name', () =>
  pact
    .addInteraction()
    .given('a product with id 1 exists')
    .uponReceiving('a request for product 1 without price')
    .withRequest('GET', '/products/1', (b) => b.headers({ Accept: 'application/json' }))
    .willRespondWith(200, (b) =>
      b.jsonBody({
        id: MatchersV3.string('1'),
        name: MatchersV3.string('Widget'),
      }),
    )
    .executeTest(async (mock) => {
      assert.equal(await productLabel(mock.url, '1'), '1: Widget');
    }));
