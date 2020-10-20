/**
 * Exports all the MikroORM entities
 *
 */

import { BaseEntity } from './base.entity';
import { Discount } from './discount';
import { Order } from './order';

export { Discount, Order };

export const entities = [BaseEntity, Discount, Order];
