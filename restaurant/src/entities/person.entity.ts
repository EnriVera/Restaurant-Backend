import { Waiter } from './waiter.entity';
import { Owner } from './owner.entity';
import { Google } from './google.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Person {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  google?: Google;

  @ApiProperty()
  owners?: Owner[];

  @ApiProperty()
  waiters?: Waiter[];
}

export class CreatedInfoPerson {

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  google?: Google;
}
