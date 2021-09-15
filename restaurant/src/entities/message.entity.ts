import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseMessage {
  @Field(() => Int)
  @ApiProperty()
  code: number;

  @Field()
  @ApiProperty()
  respose: string;
}
