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
import { Dropdown } from 'primeng/dropdown';




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
  isLoading: boolean = false;
  forms: Form;

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

    this.close();
    this.isLoading = true;
    let params: Observable<Params> = this.activatedRouter.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getServicoPrestadoById(this.id)
          .subscribe(
            response => {
              this.montaServicoPrestado(response);
              this.isLoading = false;
            }, erro => {       
              this.servico = new ServicoPrestado();       
              this.errors = erro.error.erros
              if (this.errors == undefined) {
                this.errors = ["Ocorreu um erro ao carregar serviço prestado!"]
              }
              this.isLoading = false;
            });
      }else {
        this.isLoading = false;

      }
    });

    if (this.errors == undefined || this.errors.length == 0) {
      this.clienteService
        .getClientes()
        .subscribe(
          response => {
            this.clientes = response.filter(x => x.status)
            this.clientes.map(v => v.search = v.id + " - "+v.name);
          }, erro => {            
            this.errors = erro.error.erros
            if (this.errors == undefined) {
              this.errors = ["Ocorreu um erro ao carregar cliente"]
            }
          });
    }

    if (this.errors == undefined || this.errors.length == 0) {
      this.definicaoService.getTipoServicos()
        .subscribe(response => {
          this.tipoServico = response;
          this.tipoServico.map(v => v.search = v.id + " - "+v.service);
        }, erro => {          
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao carregar tipo de serviço"]
          }
        });
    }

    

  }

  close() {
    this.errors = [];
    this.success = false;
  }

  onSubmit() {

    this.close();
    this.isLoading = true;
    this.servico.date = DateUtil.dateFormat(this.servico.date);
    this.servico.value.replace(",", ".");    
    this.service.salvar(this.servico)
      .subscribe(response => {
        this.isLoading = false;
        this.success = true;
        this.errors = null;
        this.montaServicoPrestado(response);
      }, erro => {        
        this.isLoading = false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao salvar/atualizar registro"];
        }
      });

  }

  montaServicoPrestado(response: any) {
    this.servico.id = response.id
    this.servico.idClient = response.client.id;
    this.servico.description = response.description;
    this.servico.idTypeService = response.typeService.id;
    this.servico.date = response.date;
    this.servico.value = response.value;
  }


  clearFilter(dropdown: Dropdown) {
    dropdown.resetFilter();
  }


}

class Form {

  cliente ?: Cliente;


  constructor() {
    this.clean();
  }

  clean() {
    this.cliente = {} as Cliente;
  }


}
