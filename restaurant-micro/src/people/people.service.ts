import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import IPeople from 'src/people/interface/people.interface';
import { CreatePersonDto } from './dto/create-person.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

//     const passwordformat = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=-_])(?=\\S+$).{8,20}$";
@Injectable()
export class PeopleService implements IPeople {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
  public async PrepareEmailPeople(
    createPersonDto: CreatePersonDto,
  ): Promise<any> {
    const mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(!mailformat.test(createPersonDto.email)) {
      return {Error: "Email Not valid"}
    }
    const user = await Prisma.FindPeople(
      this.prisma,
      'email',
      createPersonDto.email,
    );
    if (user.length !== 0) {
      return { Error: 'Already contains a user created' };
    }
    const hash = await Bycrypt.Generate(createPersonDto.password);
    const jwt = await this.jwtService.sign({
      ...createPersonDto,
      password: hash,
    });
    return {
      name: createPersonDto.name,
      email: createPersonDto.email,
      hash: jwt,
    };
  }
  public async CreatePeople(createPersonDto: CreatePersonDto) {
    const dd = await Prisma.CreatePeople(this.prisma, createPersonDto)
    console.log(dd)
  }
}

/**
 * Class for encript and endcript to password
 */
class Bycrypt {
  public static async Generate(password: any) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}

class Prisma {
  public static async FindPeople(
    prisma: PrismaService,
    tipe: string,
    value: any,
  ) {
    return await prisma.people.findMany({
      where: {
        [tipe]: value,
      },
    });
  }

  public static async CreatePeople(
    prisma: PrismaService,
    value: CreatePersonDto,
  ) {
    return await prisma.people.create({
      data: {
        ...value
      },
    });
  }
}
