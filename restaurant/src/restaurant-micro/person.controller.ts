import { ResponseMessage } from './../entities/message.entity';
// import { KafkaSend } from './kafka.send';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import { TokenExpiredError } from 'jsonwebtoken';
import { CreatedInfoPerson, Person } from './../entities/person.entity';
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
  Headers,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { JwtService } from '@nestjs/jwt';
import { basename } from 'path';
import { Resolver, Query as Gquery, Args, Context } from '@nestjs/graphql';
import { CreatePeopleInput } from 'src/dto/create-people.input';

const SECRET_JWT = process.env;
const subsKafka = {
  PrepareEmail: 'PrepareEmailPerson',
  Create: 'CreatePerson',
  SignIn: 'SignInPerson',
};
// @ApiTags('people')
// @Controller('people')
@Resolver(() => ResponseMessage)
export class PeopleController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE')
    public clientKafka: ClientKafka,
    private jwtService: JwtService,
  ) {
    // super(clientKafka);
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(subsKafka.PrepareEmail);
    this.clientKafka.subscribeToResponseOf(subsKafka.Create);
    this.clientKafka.subscribeToResponseOf(subsKafka.SignIn);
    await this.clientKafka.connect();
  }

  @Gquery(() => ResponseMessage)
  async CreateEmailPerson(@Context('req') context): Promise<ResponseMessage> {
    const person = this.jwtService.verify(context.headers.user);
    const resultInfo = await this.clientKafka
      .send(subsKafka.PrepareEmail, JSON.stringify(person))
      .toPromise();

    return { code: resultInfo.code, respose: resultInfo.value };
  }

  @Gquery(() => ResponseMessage)
  async CreatePerson(@Context('req') context): Promise<ResponseMessage> {
    try {
      const person = this.jwtService.verify(context.headers.autentication);
      const resultInfo = await this.clientKafka
        .send(subsKafka.Create, JSON.stringify(person))
        .toPromise();
      if (resultInfo.code === 201) {
        context.session.user = resultInfo.value;
        return { code: 201, respose: 'People create' };
      } else return { code: resultInfo.code, respose: resultInfo.value };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return { code: 404, respose: 'Token expired' };
      }
    }
  }

  @Gquery(() => ResponseMessage)
  async SignInPerson(@Context('req') context): Promise<ResponseMessage> {
    try {
      const person = this.jwtService.verify(context.headers.autentication);
      const resultInfo = await this.clientKafka
        .send(subsKafka.SignIn, JSON.stringify(person))
        .toPromise();

      if (resultInfo.code === 201) {
        context.session.user = resultInfo.value;
        return { code: 201, respose: 'Login susseful' };
      }
      else return { code: resultInfo.code, respose: resultInfo.value };
    } catch (error) {
      if (error instanceof TokenExpiredError){
        return { code: 404, respose: 'Token expired' };
      }
    }
  }


    // @Post('/emailsignup')
  // @HttpCode(201)
  // @ApiResponse({
  //   status: 201,
  //   description: 'The record has been successfully created.',
  // })
  // @ApiResponse({ status: 403, description: 'Forbidden.', type: Error })
  // public async CreateEmailPerson(@Body() jwtPerson: any, @Res() res:Response): Promise<any> {
  //   const person = this.jwtService.verify(jwtPerson.jwt);
  //   const resultInfo = await this.clientKafka
  //       .send(subsKafka.PrepareEmail, JSON.stringify(person))
  //       .toPromise();
  // const resultInfo = await super.Send({
  //   tipe: 'PrepareEmailPerson',
  //   value: person,
  // });
  //   await res.status(resultInfo.code).send({message: resultInfo.value})
  // }

  // @Post('/signup')
  // @HttpCode(201)
  // public async CreatePerson(@Headers('autentication') jwtPerson: any, @Req() req: any, @Res() res:Response) {
  //   try {
  //     const person = this.jwtService.verify(jwtPerson);
  //     const resultInfo = await this.clientKafka
  //       .send(subsKafka.Create, JSON.stringify(person))
  //       .toPromise();
  //     // const resultInfo = await super.Send({
  //     //   tipe: 'CreatePerson',
  //     //   value: person,
  //     // });
  //     if (resultInfo.code === 201) {
  //       req.session.user = resultInfo.value;
  //       res.status(201).send({message: 'People create'})
  //     }
  //     else res.status(resultInfo.code).send({message: resultInfo.value })
  //   } catch (error) {
  //     if (error instanceof TokenExpiredError){
  //       res.status(404).send({message: 'Token expired'})
  //     }
  //   }
  // }

  // @Post('/signin')
  // @HttpCode(201)
  // public async SignInPerson(@Headers('autentication') jwtPerson: any, @Req() req: any, @Res() res:Response) {
  //   try {
  //     const person = this.jwtService.verify(jwtPerson);
  //     const resultInfo = await this.clientKafka
  //       .send(subsKafka.SignIn, JSON.stringify(person))
  //       .toPromise();
  //     if (resultInfo.code === 201) {
  //       req.session.user = await resultInfo.value;
  //       res.status(201).send({message: 'Login susseful'})
  //     }
  //     else res.status(resultInfo.code).send({message: resultInfo.value })
  //   } catch (error) {
  //     if (error instanceof TokenExpiredError){
  //       res.status(404).send({message: 'Token expired'})
  //     }
  //   }
  // }
}
