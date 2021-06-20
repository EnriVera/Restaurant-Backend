import { Additionproduct } from './additionproduct.entity';
import { Restaurant } from './restaurant.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type_plate_drink: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  restaurant: Restaurant;

  @ApiProperty({ type: 'array' })
  additionproducts: Additionproduct;
}
