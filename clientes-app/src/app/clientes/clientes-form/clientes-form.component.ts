import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxMaskModule } from 'ngx-mask'


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


  constructor(private service: ClientesService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.cliente = new Cliente();
  }



  ngOnInit() {
    let params: Observable<Params> = this.activatedRouter.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getClientesById(this.id)
          .subscribe(
            response => this.cliente = response
            , reject => this.cliente = new Cliente()
          )
      }
    });
  }


  // Metodo para atualizar e salvar cliente no Clientes-form.Component.html
  onSubmit() {

    if (this.cliente.id) {

      this.service.atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, reject => {
          this.errors = reject.error.erros;
          this.success = false;

        })

    } else {

      this.service.salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;


        }, errorResponse => {
          this.errors = errorResponse.error.erros;
          this.success = false;
        })

    }
  }


  voltarParaListagem() {
    this.router.navigate(['/clientes']);
  }

}
