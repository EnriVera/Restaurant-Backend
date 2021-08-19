import { ApiProperty } from '@nestjs/swagger';
import { Addition } from './addition.entity';
import { Product } from './product.entity';

export class Additionproduct {
  @ApiProperty()
  id: string;

  @ApiProperty()
  count_product: number;

  @ApiProperty()
  addition: Addition;

  @ApiProperty()
  product: Product;
}