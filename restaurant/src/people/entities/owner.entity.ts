import { Person } from './person.entity';
import { ApiProperty } from "@nestjs/swagger";

export class Owner {
    @ApiProperty()
    id: string;

    @ApiProperty()
    people: Person;

    @ApiProperty({type: 'array'})
    restaurant: string;
}