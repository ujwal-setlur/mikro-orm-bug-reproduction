import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';

import { Discount, entities } from './entities';

async function main() {
  // init ORM
  const orm = await MikroORM.init({
    type: 'sqlite',
    dbName: 'test.db',
    debug: true,
    entities,
    cache: {
      enabled: false
    }
  });
  await orm.getSchemaGenerator().updateSchema();

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
