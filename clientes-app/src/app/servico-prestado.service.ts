import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from '../environments/environment'
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  constructor(private http: HttpClient) { }

  apiURL: string = environment.apiURLBase + '/api/servicos-prestados'

  salvar(servicoPrestado : ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiURL, servicoPrestado);
  }

  buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]> {
    const httpParams = new HttpParams()
      .set("name", nome).set("mes",mes ? mes.toString(): '');
    
    const url = this.apiURL + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }


  buscarDataNome(nome: string, dataInicial: string, dataFinal : string): Observable<ServicoPrestadoBusca[]> {
    const httpParams = new HttpParams()
      .set("name", nome).set("dateInitial",dataInicial ? dataInicial.toString(): '').set("dateFinal", dataFinal ? dataFinal.toString(): '');
    
    const url = this.apiURL+"/SearchNameDate?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  buscarTodos() : Observable<ServicoPrestadoBusca[]>{
    return this.http.get<ServicoPrestadoBusca[]>(`${this.apiURL}`+'/all');
    
  }

  buscarDate(dateInitial: string, dateFinal: string): Observable<ServicoPrestadoBusca[]> {
    const httpParams = new HttpParams()
      .set("dateInitial", dateInitial).set("dateFinal",dateFinal);
    
    const url = this.apiURL +"/date?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  deletar(servicoPrestado: ServicoPrestadoBusca): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${servicoPrestado.id}`);
  }

  getServicoPrestadoById(id: number): Observable<ServicoPrestadoBusca> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }


  
}
