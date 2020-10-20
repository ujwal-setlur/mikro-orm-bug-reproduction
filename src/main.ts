import 'reflect-metadata';

import { getDbMiddleware } from './db.middleware';
import { Discount } from './entities/discount';

async function main() {
  // get db middleware
  const orm = await getDbMiddleware();

  // create discount
  const discount = new Discount({ name: 'a discount', clientId: 'a client' });
  await orm.em.persistAndFlush(discount);

  // clear the EM
  orm.em.clear();

  // retrieve the discount
  const retrievedDiscount = await orm.em.findOneOrFail<Discount>(Discount, {
    id: discount.id
  });

  // eslint-disable-next-line no-console
  console.log(`retrievedDiscount = ${JSON.stringify(retrievedDiscount)}`);

  // init order collection
  retrievedDiscount.orders.init();
}

main();
