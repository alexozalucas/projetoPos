import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { Agenda } from './home/agenda';
import { Anotacao } from './home/anotacao';
import { TipoAnotacao } from './home/tipoAnotacao';

@Injectable({
  providedIn: 'root'
})
export class AnotacaoService {

  apiURL: string = environment.API_BASE_URL + '/api/annotation';

  constructor(private http: HttpClient) { }

  salvarAnotacao(anotacao: Anotacao): Observable<Anotacao> {
    return this.http.post<Anotacao>(`${this.apiURL}`, anotacao)
  }

  atualizarAnotacao(anotacao: Anotacao) {
    return this.http.put<Anotacao>(`${this.apiURL}`, anotacao)
  }

  deletarAnotacao(anotacao: Anotacao) {
    return this.http.delete<any>(`${this.apiURL}/${anotacao.id}`);
  }

  getAnotacaoById(id: number): Observable<Anotacao> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getAllAnotacao(): Observable<Anotacao[]> {
    return this.http.get<any>(`${this.apiURL}`);
  }

  salvarTipoAnotacao(tipo: TipoAnotacao): Observable<TipoAnotacao> {
    return this.http.post<TipoAnotacao>(`${this.apiURL}`+'/typeannotation', tipo)
  }

  atualizarTipoAnotacao(tipo: TipoAnotacao): Observable<TipoAnotacao> {
    return this.http.put<TipoAnotacao>(`${this.apiURL}`+'/typeannotation', tipo)
  }

  deletarTipoAnotacao(tipo: TipoAnotacao) {
    return this.http.delete<any>(`${this.apiURL}/typeannotation/${tipo.id}`);
  }

  getTipoAnotacaoById(id: number): Observable<TipoAnotacao> {
    return this.http.get<any>(`${this.apiURL}/typeannotation/${id}`);
  }

  getAllTipoAnotacao(): Observable<TipoAnotacao[]> {
    return this.http.get<any>(`${this.apiURL}/typeannotation`);
  }






}










