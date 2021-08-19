import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

const {SECRET_JWT, BROKER_KAFKA} = process.env;
@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_JWT,
      signOptions: { expiresIn: 20*20 },
    }),
    // ClientsModule.register([
    //   {
    //     name: 'KAFKA_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         brokers: [BROKER_KAFKA],
    //       },
    //       consumer: {
    //         groupId: 'restaurant-micro-consumer-'+Math.random()
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PrismaService]
})
export class PeopleModule {}
