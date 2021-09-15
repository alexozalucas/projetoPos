import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../usuarios/usuario';
import { Role } from '../usuarios/roles';


const httpOptions = {
		  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiURL: string = environment.API_BASE_URL + '/api/user';

  getUserAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.apiURL}`+'/all');
  }

  salvar(user: Usuario, role: Role[] ): Observable<any> {
    const url = this.apiURL + "/role/user/"+user.id+ "/status/"+user.enabled  
    return this.http.put<any>(url,role);
  }

  getRoleAll(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiURL}`+'/role/all');
  }


  getCurrentUser(): Observable<any> {
    return this.http.get(environment.API_URL + 'user/me', httpOptions);
  }

  
}
