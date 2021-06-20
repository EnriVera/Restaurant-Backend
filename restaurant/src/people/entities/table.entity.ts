import { Addition } from './addition.entity';
import { Restaurant } from './restaurant.entity';
import { Waiter } from './waiter.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Table {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name_table: string;

  @ApiProperty()
  count_chairs: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  restaurant: Restaurant;

  @ApiProperty()
  waiter: Waiter;

  @ApiProperty({ type: 'array' })
  addition: Addition;
}
