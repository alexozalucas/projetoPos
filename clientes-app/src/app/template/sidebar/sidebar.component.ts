import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }


  ngOnInit() {

    var user = this.tokenStorageService.getUser();
    this.usuarioLogado = user.displayName;
  }

  logout(){
    //this.authService.encerrarSessao();
    //this.router.navigate(['/login'])
    
      this.tokenStorageService.signOut();    
      this.router.navigate(['/login'])
    
  }
  

}
