import { TipoPagamento } from "src/app/pagamento/tipo-pagamento";
import { ServicoPrestadoBusca} from "../../servico-prestado/servico-prestado-lista/servicoPrestadoBusca";

export class PrestacaoContasBuscar {

    id: number;
    serviceProvided: ServicoPrestadoBusca;
    discountValue: number;
    additionValue: number;  
    observation: string;
    typePayment :TipoPagamento;
    totalValue: number;
    datePayment: String;
    


}