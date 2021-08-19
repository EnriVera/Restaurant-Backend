import { CreatePersonDto } from "src/people/dto/create-person.dto";

export default interface IPeople {
    PrepareEmailPeople(createPersonDto: CreatePersonDto): Promise<any>
    CreatePeople(createPersonDto: CreatePersonDto)
}