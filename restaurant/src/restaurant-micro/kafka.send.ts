import { Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

export abstract class KafkaSend implements OnModuleInit{
    constructor(
        public clientKafka: ClientKafka,
    ){}
    async onModuleInit() {
        this.clientKafka.subscribeToResponseOf(['PrepareEmailPerson', 'CreatePerson']);
        // await this.clientKafka.connect();
    }
    public async Send(kafka){
        return await this.clientKafka
        .send(kafka.tipe, JSON.stringify(kafka.value))
        .toPromise();
    }
}