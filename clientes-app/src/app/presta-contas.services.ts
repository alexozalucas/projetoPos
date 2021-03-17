import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PrestacaoContasBuscar } from "./prestacao/contas-lista/prestacao-contas-buscar";


@Injectable({
    providedIn: 'root'
  })
export class PrestaContasService {

    apiURL: string = environment.apiURLBase + '/api/accountability';
  
    constructor(private http: HttpClient) { }
  
    salvar(prestacaoContas: PrestacaoContasBuscar): Observable<PrestacaoContasBuscar> {
      return this.http.post<PrestacaoContasBuscar>(`${this.apiURL}`, prestacaoContas)
    }  
     
    getPrestacaoContas(): Observable<PrestacaoContasBuscar[]> {
      return this.http.get<PrestacaoContasBuscar[]>(`${this.apiURL}`);      
    }
  
    getPrestacaoContasById(id: number): Observable<PrestacaoContasBuscar> {
      return this.http.get<any>(`${this.apiURL}/${id}`);
    }
  
    deletar(prestacaoContas: PrestacaoContasBuscar): Observable<any> {
      return this.http.delete<any>(`${this.apiURL}/${prestacaoContas.id}`);
    }
  
  }