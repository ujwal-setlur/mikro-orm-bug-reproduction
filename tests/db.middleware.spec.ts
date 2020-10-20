/**
 * Copyright Byte Technology 2020. All rights reserved.
 */

afterEach(() => {
  jest.resetModules();
});

test('Get multiple one by one', async () => {
  const { getDbMiddleware } = await import('../src/db.middleware');

  const mw1 = await getDbMiddleware();
  const mw2 = await getDbMiddleware();
  expect(mw1).toBe(mw2);

  // cleanup
  await mw1.close();
});

// skipping: in mikro-orm-v4, this has issues with previously create unique index not beloing cleared. Happens only with sqlite in-memory
// It's not the specific test. Even if you repeat the previous test here, it will fail
test('Get multiple at once', async () => {
  const { getDbMiddleware } = await import('../src/db.middleware');

  const [mw1, mw2] = await Promise.all([getDbMiddleware(), getDbMiddleware()]);
  expect(mw1).toBe(mw2);

  // cleanup
  await mw1.close();
});

export {};
