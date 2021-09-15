import { PersonDto } from "src/people/dto/person.dto";

export default interface IPeople {
    PrepareEmailPeople(createPersonDto: PersonDto): Promise<any>
    CreatePeople(createPersonDto: PersonDto)
    SignInPeople(PersonDto: PersonDto)
}