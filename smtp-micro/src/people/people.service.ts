import IPeople from './interface/people.interface';
import { TPeople } from './entities/people.entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PeopleService implements IPeople {
  public ConfirmAuthentication(infoPerson: TPeople) {
    const { URL_WEB, PERSONAL_EMAIL } = process.env;
    return {
      from: `Sender Name <${PERSONAL_EMAIL}>`,
      to: `Recipient <${infoPerson.email}>`,
      subject: 'Confirm Authentication ✔',
      text: `Hello to ${infoPerson.name}!`,
      html: `
        <div>
            <h1>
                <b>
                    Hello
                </b>
                ${infoPerson.name}!
            </h1>
            </br>
            <h3>
                Click on the link to confirm the authentication:
            </h3>
            </br>
            <a href="${URL_WEB}email-valit-authorization/user?authentication=${infoPerson.hash}">
                Confirm Authentication
            </a>
        </div>
        `,
    };
  }
}
