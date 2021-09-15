import { Google } from "./google-person.dto";

export class PersonDto {
    name: string;
  
    email: string;
  
    password: string;
    
    google?: Google;
}
