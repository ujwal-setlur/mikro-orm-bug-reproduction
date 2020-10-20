import thunkyp from 'thunky/promise';
import { MikroORM } from '@mikro-orm/core';

import { entities } from './entities';

export const getDbMiddleware = thunkyp(async function getDbMiddleware() {
  // init ORM
  const orm = await MikroORM.init({
    type: 'sqlite',
    dbName: ':memory:',
    debug: true,
    entities,
    cache: {
      enabled: false
    }
  });
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema(false);

  return orm;
});
