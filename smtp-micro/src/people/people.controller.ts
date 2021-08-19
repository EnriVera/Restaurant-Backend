import IPeople from './interface/people.interface';
import { TPeople } from './entities/people.entities';
import { Controller, forwardRef, Inject } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';
import { PeopleService } from './people.service';
import * as nodemailer from 'nodemailer';

const { SMTP_HOTS, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
const transporter = nodemailer.createTransport({
    host: SMTP_HOTS,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
})

@Controller()
export class PeopleController {
  constructor(
    @Inject(forwardRef(() => PeopleService)) 
    private readonly peopleService: IPeople, 
    ) {}

  @MessagePattern('SignUpPerson')
  public async EmailSignUp(@Ctx() createPersonDto: KafkaContext) {
    const buffer = JSON.stringify(createPersonDto.getMessage().value)
    const peopleType: TPeople = JSON.parse(buffer)
    const emailPeople = await this.peopleService.ConfirmAuthentication(peopleType)
    this.SendEmail(emailPeople)
  }

  public SendEmail(message: any) {
    return new Promise((resolve: any) => {
        transporter.sendMail(message, (err) => {
            if (err) resolve(false);
            resolve(true);
        })
    })
  }
}