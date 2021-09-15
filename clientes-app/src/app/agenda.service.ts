import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { Agenda } from './home/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  apiURL: string = environment.API_BASE_URL + '/api/schedule';

  constructor(private http: HttpClient) { }

  salvar(agenda: Agenda) {
    return this.http.post<Agenda>(`${this.apiURL}`, agenda)
  }

  saveValidate(agenda: Agenda) {
    return this.http.post<Agenda>(`${this.apiURL}/validate`, agenda)
  }

  getAgendaById(id: number): Observable<Agenda> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getAgendaBydate(dateInitial: string, dateFinal: string): Observable<Agenda[]> {
    const httpParams = new HttpParams()
          .set("dateInitial", dateInitial).set("dateFinal",dateFinal);
    const url = this.apiURL + "/date?" + httpParams.toString();      
    return this.http.get<any>(url);
  }

  deletar(agenda: Agenda): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${agenda.id}`);
  }

}










