
import { Cliente } from "src/app/clientes/cliente";
import { TipoServico } from "src/app/definicao/tipo-servico";

export class ServicoPrestadoBusca {

    id: number;
    description: string;
    value: number;
    date: string;
    client: Cliente;
    typeService: TipoServico;

}