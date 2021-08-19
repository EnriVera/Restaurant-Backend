import { Additionproduct } from './additionproduct.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Table } from './table.entity';

export class Addition {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  table: Table;

  @ApiProperty({ type: 'array' })
  additionproducts: Additionproduct;
}
