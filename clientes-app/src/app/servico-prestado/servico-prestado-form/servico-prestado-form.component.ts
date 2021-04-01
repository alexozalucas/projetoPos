import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servicoPrestado';
import { TipoServico } from '../../definicao/tipo-servico';
import { DefinicaoService } from 'src/app/definicao.service';
import { DateUtil } from 'src/app/util/Date-Util';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';


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
  id: number;

  constructor(
    private clienteService: ClientesService,
    private definicaoService: DefinicaoService,
    private service: ServicoPrestadoService,
    private activatedRouter: ActivatedRoute,
  ) {
    this.servico = new ServicoPrestado();
    this.servico.date = "";
    this.servico.value = "";
  }

  ngOnInit() {


    let params: Observable<Params> = this.activatedRouter.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getServicoPrestadoById(this.id)
          .subscribe(
            response => {
              this.montaServicoPrestado(response);
            }, reject => {
              this.servico = new ServicoPrestado();
            })
      }
    });

    this.clienteService
      .getClientes()
      .subscribe(response =>
        this.clientes = response);

    this.definicaoService.getTipoServicos()
      .subscribe(response =>
        this.tipoServico = response);

  }

  onSubmit() {

    this.servico.date = DateUtil.dateFormat(this.servico.date);
    this.servico.value.replace(",", ".");
    this.service.salvar(this.servico)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.montaServicoPrestado(response);
      }, reject => {
        this.errors = reject.error.erros;

      });

  }

  montaServicoPrestado(response: any){
    this.servico.id = response.id
    this.servico.idClient = response.client.id;
    this.servico.description = response.description;
    this.servico.idTypeService = response.typeService.id;
    this.servico.date = response.date;
    this.servico.value = response.value;
  }

}
