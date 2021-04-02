import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TipoServico } from "./definicao/tipo-servico";
import { TipoPagamento } from "./pagamento/tipo-pagamento";
import { PrestacaoContas } from "./prestacao/prestacao-conta";

@Injectable({
    providedIn: 'root'
  })
export class PagamentoService {

    apiURL: string = environment.API_BASE_URL + '/api/accountability/typepayment';
  
    constructor(private http: HttpClient) { }
  
    salvar(tipoPagamento: TipoPagamento): Observable<TipoPagamento> {
      return this.http.post<TipoPagamento>(`${this.apiURL}`, tipoPagamento)
    }  
     
    getTipoPagamento(): Observable<TipoPagamento[]> {
      return this.http.get<TipoPagamento[]>(`${this.apiURL}`);
    }
  
    getTipoServicoById(id: number): Observable<TipoPagamento> {
      return this.http.get<any>(`${this.apiURL}/${id}`);
    }
  
    deletar(tipoPagamento: TipoPagamento): Observable<any> {
      return this.http.delete<any>(`${this.apiURL}/${tipoPagamento.id}`);
    }
  
    atualizar(tipoPagamento: TipoPagamento): Observable<any> {
      return this.http.put<TipoPagamento>(`${this.apiURL}/`, tipoPagamento)
    }

  }