import { PartialType } from '@nestjs/mapped-types';
import { PersonDto } from './person.dto';

export class UpdatePersonDto extends PartialType(PersonDto) {
  id: number;
}
