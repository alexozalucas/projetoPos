import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TipoServico } from "./definicao/tipo-servico";

@Injectable({
    providedIn: 'root'
  })
export class DefinicaoService {

    apiURL: string = environment.API_BASE_URL + '/api/typeservice';
  
    constructor(private http: HttpClient) { }
  
    salvar(tipoServico: TipoServico): Observable<TipoServico> {
      return this.http.post<TipoServico>(`${this.apiURL}`, tipoServico)
    }  
     
    getTipoServicos(): Observable<TipoServico[]> {
      return this.http.get<TipoServico[]>(`${this.apiURL}`);
    }
  
    getTipoServicoById(id: number): Observable<TipoServico> {
      return this.http.get<any>(`${this.apiURL}/${id}`);
    }
  
    deletar(tipoServico: TipoServico): Observable<any> {
      return this.http.delete<any>(`${this.apiURL}/${tipoServico.id}`);
    }

    atualizar(typeService: TipoServico): Observable<TipoServico> {
      return this.http.put<TipoServico>(`${this.apiURL}/${typeService.id}`, typeService)
    }

  
  }