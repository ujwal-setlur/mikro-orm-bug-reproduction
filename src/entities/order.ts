/**
 * Discount Order entity. Any order associated with a discount
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { Entity, Property, ManyToOne } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Discount } from './discount';

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => Discount)
  discount!: Discount;

  @Property()
  orderId!: string;

  constructor(data: Omit<Order, keyof BaseEntity | 'discount'>) {
    super();
    Object.assign(this, data);
  }
}
