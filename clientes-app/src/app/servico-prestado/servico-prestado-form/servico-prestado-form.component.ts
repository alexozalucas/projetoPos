import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servicoPrestado';
import { TipoServico} from '../../definicao/tipo-servico';
import { DefinicaoService } from 'src/app/definicao.service';



@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = []
  tipoServico: TipoServico[] = []
  servico: ServicoPrestado;
  success: boolean = false;
  errors: String[];

  constructor(
    private clienteService: ClientesService,
    private definicaoService: DefinicaoService,
    private service: ServicoPrestadoService
  ) {
    this.servico = new ServicoPrestado();

  }

  ngOnInit() {
    this.clienteService
      .getClientes()
      .subscribe(response =>
        this.clientes = response);

    this.definicaoService.getTipoServicos()
    .subscribe(response =>
        this.tipoServico =response );

  }

  onSubmit() {
    this.service.salvar(this.servico)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.servico = new ServicoPrestado();
      }, reject => {
        this.errors = reject.error.erros;

      })
  }

}
