import { Component, OnInit } from '@angular/core';
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
  private showRoleAdmin;

  constructor(
    private authService: AuthServices,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }


  ngOnInit() {

    const user = this.tokenStorageService.getUser();
    this.usuarioLogado = user.displayName + this.roles;
    this.roles = user.roles;

    this.showRoleAdmin = this.roles.includes('ROLE_ADMIN');
    if(this.showRoleAdmin){
      this.usuarioLogado = user.displayName + "- ADMIN";  
    }else {
      this.usuarioLogado = user.displayName;
    }
  }

  logout(){
   
      this.tokenStorageService.signOut();    
      this.router.navigate(['/login'])
    
  }
  

}
