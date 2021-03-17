import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Grafico } from "./grafico/grafico"


@Injectable({
    providedIn: 'root'
  })
export class GraficoService {

    apiURL: string = environment.apiURLBase + '/api/graphic';
  
    constructor(private http: HttpClient) { }
  
    getAll(datePaymentInitial: string, datePaymentFinal: string): Observable<Grafico[]> {
        const httpParams = new HttpParams()
          .set("datePaymentInitial", datePaymentInitial).set("datePaymentFinal",datePaymentFinal);
        
        const url = this.apiURL +"?" + httpParams.toString();
        return this.http.get<any>(url);
      }
    
  }