import { PeopleController } from './person.controller';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

const {SECRET_JWT, CLIENT_KAFKA} = process.env
@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_JWT,
      signOptions: { expiresIn: 20*20 },
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [CLIENT_KAFKA],
          },
          consumer: {
            groupId: 'consumer-restaurant-'+Math.random()
          },
        },
      },
    ]),
  ],
  controllers: [PeopleController],
  providers: [],
})
export class RestaurantMicroModule {}