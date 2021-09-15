import { RestaurantMicroModule } from './restaurant-micro/restaurant-micro.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // debug: false,
      // playground: false,
      autoSchemaFile: true,
    }),
    RestaurantMicroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}