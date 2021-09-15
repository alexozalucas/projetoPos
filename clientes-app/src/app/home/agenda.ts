import { Time } from "@angular/common";
import { Cliente } from "../clientes/cliente";

export class Agenda{

    id: number;
    date: string;
	title: string;	
	observation: string;
    client: Cliente[];
    hourInitial: Time;
    hourFinal: Time;
    flagConfirmation: boolean;
    

}