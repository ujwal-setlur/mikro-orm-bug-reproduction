/**
 * Coupon Code entity associated with a coupon.
 *
 */
import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  ManyToOne,
  Property,
  Unique,
  Index
} from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Coupon } from './coupon';

@Unique({ properties: ['clientId', 'code'] })
@Index({ properties: ['code', 'valid'] })
@Entity()
export class CouponCode extends BaseEntity {
  @ManyToOne(() => Coupon) // child
  coupon!: Coupon;

  @Property()
  clientId!: string; // Only for unique index purpose

  @Property()
  code!: string;

  @Property()
  usedCount: number = 0;

  @Property() // Only for comparison purposes
  valid: boolean = true;

  @BeforeCreate()
  @BeforeUpdate()
  updateValidity() {
    // Disable coupon if maxUses reached, if not already disabled explicitly, e.g. when discount is ended
    if (this.valid) {
      this.valid =
        this.coupon.maxUses === 0 || this.usedCount < this.coupon.maxUses;
    }
  }

  constructor(
    data: Omit<
      CouponCode,
      keyof BaseEntity | 'usedCount' | 'coupon' | 'updateValidity' | 'valid'
    >
  ) {
    super();
    Object.assign(this, data);
  }
}
