import { Person } from './entities/person.entity';
import { Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('people')
@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: Person})
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Error})
  @MessagePattern('createPerson')
  create(@Payload() createPersonDto: CreatePersonDto): Promise<Person> {
    return;
    // return this.peopleService.create(createPersonDto);
  }

  @MessagePattern('findAllPeople')
  findAll() {
    return this.peopleService.findAll();
  }

  @MessagePattern('findOnePerson')
  findOne(@Payload() id: number) {
    return this.peopleService.findOne(id);
  }

  @MessagePattern('updatePerson')
  update(@Payload() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(updatePersonDto.id, updatePersonDto);
  }

  @MessagePattern('removePerson')
  remove(@Payload() id: number) {
    return this.peopleService.remove(id);
  }
}
