/**
 * Coupon entity associated with a discount.
 *
 */
import {
  Entity,
  Property,
  OneToOne,
  OneToMany,
  Collection
} from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { CouponCode } from './coupon.code';
import { Discount } from './discount';

@Entity()
export class Coupon extends BaseEntity {
  @OneToOne(() => Discount, d => d.coupon) // child
  discount!: Discount;

  @Property()
  clientId!: string;

  @Property()
  prefix!: string;

  @Property()
  codeLength!: number;

  @Property()
  count!: number;

  @Property()
  maxUses!: number;

  @OneToMany(() => CouponCode, c => c.coupon, { orderBy: {} })
  codes = new Collection<CouponCode>(this);

  constructor(data: Omit<Coupon, keyof BaseEntity | 'discount' | 'codes'>) {
    super();
    Object.assign(this, data);
  }
}
