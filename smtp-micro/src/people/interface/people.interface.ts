import { TPeople } from './../entities/people.entities';
export default interface IPeople {
    ConfirmAuthentication(infoPerson: TPeople)
}