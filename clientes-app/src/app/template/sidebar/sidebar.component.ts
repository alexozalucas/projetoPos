import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth.services';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado: string;
  private roles: string[];
  private showRoleAdmin: boolean;
  private showUserRole: boolean;
  private showUrlUser: string;

  constructor(
    private authService: AuthServices,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    this.showUrlUser = "/clientes";
    this.returnPermission();
  }

  returnPermission(){

    const user = this.tokenStorageService.getUser();
    this.usuarioLogado = user.displayName + this.roles;
    this.roles = user.roles;

    this.showRoleAdmin = this.roles.includes('ROLE_ADMIN');
    this.showUserRole = this.roles.includes('ROLE_USER');
   
    if(this.showRoleAdmin){
      this.usuarioLogado = user.displayName + "- ADMIN";  
    }else if(this.roles.includes('ROLE_USER')){
      this.usuarioLogado = user.displayName + "- AVANÇADO";
    }else if(this.roles.includes('USER')){
      this.usuarioLogado = user.displayName + "- BÁSICO";
      this.showUrlUser = "/clientes/form";
    }

    var permission = false
    if(this.showRoleAdmin || this.showUserRole){
      permission = true; 
    }
     return permission
  }

  logout(){
   
      this.tokenStorageService.signOut();    
      this.router.navigate(['/login'])
  }
  

}
