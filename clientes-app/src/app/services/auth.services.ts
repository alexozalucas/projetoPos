import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  googleURL = environment.GOOGLE_AUTH_URL;

  constructor(private http: HttpClient ,
              private token: TokenStorageService   
    ) { }

    jwtHelper: JwtHelperService = new JwtHelperService();

  login(credentials): Observable<any> {
    return this.http.post(environment.AUTH_API + 'signin', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(environment.AUTH_API + 'signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }

  isAuthenticated() : boolean {
    const token = this.token.getToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false;
  }


}
