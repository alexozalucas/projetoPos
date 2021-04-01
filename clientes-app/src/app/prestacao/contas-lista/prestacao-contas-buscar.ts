import { TipoPagamento } from "src/app/pagamento/tipo-pagamento";
import { ServicoPrestadoBusca} from "../../servico-prestado/servico-prestado-lista/servicoPrestadoBusca";

export class PrestacaoContasBuscar {

    id: number;
    serviceProvided: ServicoPrestadoBusca;
    discountValue: string;
    additionValue: string;  
    observation: string;
    typePayment :TipoPagamento;
    totalValue: string;
    datePayment: string;
    


}