import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServices } from './services/auth.services';
import { TokenStorageService } from './services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthServices,
    private router: Router,
    private token : TokenStorageService
    
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const user = this.token.getUser();  
    const authenticated =  this.authService.isAuthenticated();  
    var role = next.data.roles;
    if(role){
      var userRole = user.roles.includes('ROLE_ADMIN');
    }
    
      

    if(role == 'ROLE_ADMIN' && authenticated && userRole){  
      return true;
    }else 
    if(role == 'ROLE_ADMIN' && authenticated && !userRole){
      this.router.navigate(['/home'])     
      return false;
    }else
    if(authenticated && role != 'ROLE_ADMIN'){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }

  }
  
}