/**
 * Discount entity. Main owning entity.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import {
  Entity,
  Property,
  Collection,
  OneToMany,
  OneToOne
} from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Coupon } from './coupon';
import { Order } from './order';

@Entity()
export class Discount extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  clientId!: string;

  @OneToOne(() => Coupon, undefined, { nullable: true }) // owner
  coupon: Coupon | null = null;

  @OneToMany(() => Order, discountOrder => discountOrder.discount, {
    nullable: true,
    orderBy: {}
  })
  orders = new Collection<Order>(this);

  constructor(data: Omit<Discount, keyof BaseEntity | 'coupon' | 'orders'>) {
    super();
    Object.assign(this, data);
  }
}
