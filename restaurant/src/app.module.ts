import { KafkaModule } from './kafka.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    KafkaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}