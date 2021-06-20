import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './people/people.module';

// const {HOSTDB}= process.env;
// const  {POSTDB} = process.env;
// console.log(HOSTDB, " ----- " ,POSTDB)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './envirotmend.env',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: "localhost",
    //   port: 5444,
    //   username: 'restaurant',
    //   password: 'rSUzRBlj4Sbi8625QHilqiCmcuMax2',
    //   database: 'postgres_restaurant',
    //   entities: [],
    //   synchronize: true,
    // }),
    PeopleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}