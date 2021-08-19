import { RestaurantMicroModule } from './restaurant-micro/restaurant-micro.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RestaurantMicroModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}