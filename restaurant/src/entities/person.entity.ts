import { Waiter } from './waiter.entity';
import { Owner } from './owner.entity';
import { Google } from './google.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field()
  @ApiProperty()
  id: string;

  @Field()
  @ApiProperty()
  name: string;

  @Field()
  @ApiProperty()
  email: string;

  @Field()
  @ApiProperty()
  password: string;

  // @Field({ nullable: true })
  // @ApiProperty()
  // google?: Google;

  // @Field({ nullable: true })
  // @ApiProperty()
  // owners?: Owner[];

  // @Field({ nullable: true })
  // @ApiProperty()
  // waiters?: Waiter[];
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
