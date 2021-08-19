import { Google } from "./google-person.dto";

export class CreatePersonDto {
    name: string;
  
    email: string;
  
    password: string;
    
    google?: Google;
}
