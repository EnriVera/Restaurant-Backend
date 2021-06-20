import { Product } from './product.entity';
import { Table } from './table.entity';
import { Waiter } from './waiter.entity';
import { Owner } from './owner.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Restaurant {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  owner: Owner;
  @ApiProperty({ type: 'array' })
  waiters: Waiter;
  @ApiProperty({ type: 'array' })
  products: Product;
  @ApiProperty({ type: 'array' })
  tables: Table;
}
