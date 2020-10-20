/**
 * Exports all the MikroORM entities
 *
 */

import { BaseEntity } from './base.entity';
import { Coupon } from './coupon';
import { CouponCode } from './coupon.code';
import { Discount } from './discount';
import { Order } from './order';

export { Coupon, CouponCode, Discount, Order };

export const entities = [BaseEntity, Coupon, CouponCode, Discount, Order];
