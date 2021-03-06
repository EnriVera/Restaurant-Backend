import { Request, Response } from 'express';
// import { KafkaSend } from './kafka.send';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import { TokenExpiredError } from 'jsonwebtoken';
import { CreatedInfoPerson } from './../entities/person.entity';
import {
  Body,
  Controller,
  HttpCode,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { JwtService } from '@nestjs/jwt';
import { basename } from 'path';

const SECRET_JWT = process.env;
@ApiTags('people')
@Controller('people')
export class PeopleController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICee')
    public clientKafka: ClientKafka,
    private jwtService: JwtService,
  ) {
    // super(clientKafka);
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(['PrepareEmailPerson', 'CreatePerson']);
    // await this.clientKafka.connect();
}

  @Post('/emailsignup')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Error })
  public async CreateEmailPerson(@Body() jwtPerson: any, @Res() res:Response): Promise<any> {
    const person = this.jwtService.verify(jwtPerson.jwt);
    const resultInfo = await this.clientKafka
        .send("PrepareEmailPerson", JSON.stringify(person))
        .toPromise();
    // const resultInfo = await super.Send({
    //   tipe: 'PrepareEmailPerson',
    //   value: person,
    // });
    await res.status(201).send({message: resultInfo.value})
  }

  @Post('/signup')
  @HttpCode(201)
  public async CreatePerson(@Query('jwt') jwtPerson: any, @Req() req: any, @Res() res:Response) {
    try {
      const person = this.jwtService.verify(jwtPerson);
      const resultInfo = await this.clientKafka
        .send("CreatePerson", JSON.stringify(person))
        .toPromise();
      // const resultInfo = await super.Send({
      //   tipe: 'CreatePerson',
      //   value: person,
      // });
      if (!resultInfo.Error) {
        req.session.user = resultInfo.user;
        return { message: 'People create' };
      }
      return { message: resultInfo.Error };
    } catch (error) {
      if (error instanceof TokenExpiredError){
        res.status(404).send({message: 'Token expired'})
      }
    }
  }
}
