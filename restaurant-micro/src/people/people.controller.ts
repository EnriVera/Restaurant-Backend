import { Controller, forwardRef, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  ClientProxy,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import IPeople from 'src/people/interface/people.interface';
import { Producer } from 'kafkajs';

@Controller()
export class PeopleController implements OnModuleInit {
  private KafkaProducer: Producer;
  constructor(
    @Inject(forwardRef(() => PeopleService))
    private readonly peopleService: IPeople,
    // @Inject('KAFKA_SERVICE')
    // private client: ClientProxy,
  ) {}

  async onModuleInit() {
    // this.KafkaProducer = await this.client.connect();
  }

  @MessagePattern('PrepareEmailPerson')
  public async CreateEmailPerson(@Ctx() createPersonDto: KafkaContext) {
    const personDTO: CreatePersonDto = this.NewBuffer<CreatePersonDto>(createPersonDto);
    const objectEmail = await this.peopleService.PrepareEmailPeople(personDTO);
    if (!objectEmail.Error) {
      // this.KafkaProducer.send({
      //   topic: 'SignUpPerson',
      //   messages: [
      //     {
      //       key: Math.random() + '-kf',
      //       value: JSON.stringify(objectEmail),
      //     },
      //   ],
      // });
      return { value: 'Send Email' };
    }
    return { value: objectEmail.Error };
  }
  @MessagePattern('CreatePerson')
  public async CreatePerson(@Ctx() createPersonDto: KafkaContext) {
    const personDTO = await this.NewBuffer<CreatePersonDto>(createPersonDto)
    const respose = await this.peopleService.CreatePeople(personDTO)
    return respose;
  }

  private NewBuffer<T>(KafkaContext: KafkaContext) {
    const buffer = JSON.stringify(KafkaContext.getMessage().value);
    const DTO: T = JSON.parse(buffer);
    return DTO
  }
}
