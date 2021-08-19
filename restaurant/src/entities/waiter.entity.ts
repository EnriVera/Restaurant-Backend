import { Restaurant } from './restaurant.entity';
import { Table } from './table.entity';
import { Person } from './person.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Waiter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  number_waiter: number;

  @ApiProperty()
  restaurant: Restaurant;

  @ApiProperty()
  people: Person;

  @ApiProperty()
  tables: Table;
}
