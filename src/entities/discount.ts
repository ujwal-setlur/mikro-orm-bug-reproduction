/**
 * Discount entity. Main owning entity.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { Entity, Property, Collection, OneToMany } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Order } from './order';

@Entity()
export class Discount extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  clientId!: string;

  @OneToMany(() => Order, discountOrder => discountOrder.discount, {
    nullable: true
  })
  orders = new Collection<Order>(this);

  constructor(data: Omit<Discount, keyof BaseEntity | 'orders'>) {
    super();
    Object.assign(this, data);
  }
}
