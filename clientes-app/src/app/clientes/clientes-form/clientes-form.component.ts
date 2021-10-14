import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;
  isLoading: boolean = false;
  
  

  constructor(private service: ClientesService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private tokenStorageService: TokenStorageService,) {
    this.cliente = new Cliente();
  }

  close() {
    this.errors = [];
    this.success = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.cliente.status = true;
    let params: Observable<Params> = this.activatedRouter.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getClientesById(this.id)
          .subscribe(
            response => {
              this.cliente = response;    
              this.isLoading = false;          
            }
            , reject => {
              this.cliente = new Cliente();   
                     
            }
          )
      }else {
        this.isLoading = false; 
      }
      
    });
    
  }

  returnPermission() {
    const user = this.tokenStorageService.getUser();
    var permission = true;
    if (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_USER')) {
      permission = false;
    }
    return permission;
  }



  // Metodo para atualizar e salvar cliente no Clientes-form.Component.html
  onSubmit() {
    this.isLoading = true;
    this.close();
    if (this.cliente.id) {
      
      this.service.atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;          
          this.cliente = response; 
          this.isLoading = false;        
        }, erro => {
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu erro ao atualizar registro!"]
          }
          this.isLoading = false;         
        })

    } else {

      this.service.salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;  
          this.isLoading = false;        

        }, erro => {
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu erro ao salvar registro!"]
          }
          this.isLoading = false;
         
        })

    }
    
  }

  VerificaStatus(event){
    this.cliente.status = event;
  }

  voltarParaListagem() {
    this.close();
    this.router.navigate(['/clientes']);
    
  }

}
