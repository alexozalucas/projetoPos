import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PrestaContasService } from 'src/app/presta-contas.services';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from 'src/app/servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import { PrestacaoContasBuscar } from '../contas-lista/prestacao-contas-buscar';
import { PagamentoService } from '../../pagamento.services';
import { TipoPagamento } from 'src/app/pagamento/tipo-pagamento';
import { NgxMaskModule } from 'ngx-mask'
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-prestacao-contas',
  templateUrl: './prestacao-contas.component.html',
  styleUrls: ['./prestacao-contas.component.css']
})

export class PrestacaoContasComponent implements OnInit {

  servicoPrestadoBusca: ServicoPrestadoBusca[] = [];
  prestacaoContasBuscar: PrestacaoContasBuscar;
  servicoPrestadoBuscaSelecionado: ServicoPrestadoBusca;
  tipoPagamento: TipoPagamento[] = [];
  tipoPagamentoSelecionado: TipoPagamento;
  success: boolean = false;
  errors: String[];
  id: number;
  dataInicial: string;
  dataFinal: string;
  relatorio: boolean;


  constructor(
    private service: PrestaContasService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private servicoPrestadoService: ServicoPrestadoService,
    private pagamentoService: PagamentoService,

  ) {
    this.prestacaoContasBuscar = new PrestacaoContasBuscar();
    this.servicoPrestadoBuscaSelecionado = new ServicoPrestadoBusca();
    this.tipoPagamentoSelecionado = new TipoPagamento();

  }

  ngOnInit() {


    let params: Observable<Params> = this.activatedRouter.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getPrestacaoContasById(this.id)
          .subscribe(
            response => {
              this.prestacaoContasBuscar = response
              this.servicoPrestadoBuscaSelecionado = response.serviceProvided
              this.tipoPagamentoSelecionado.id = response.typePayment.id;
              this.relatorio = this.activatedRouter.snapshot.params.relatorio;
            }, reject => {
              this.prestacaoContasBuscar = new PrestacaoContasBuscar();
            })
      }
    });

    this.pagamentoService.getTipoPagamento()
      .subscribe(response => {
        this.tipoPagamento = response;
      })

  }

  onSubmit() {

    if (!this.prestacaoContasBuscar.id) {
      this.prestacaoContasBuscar.serviceProvided = this.servicoPrestadoBuscaSelecionado;
    }
    this.prestacaoContasBuscar.typePayment = this.tipoPagamentoSelecionado;
    this.service.salvar(this.prestacaoContasBuscar)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.prestacaoContasBuscar = response;
      }, reject => {
        this.errors = reject.error.erros;
        this.success = false;
      })
  }



  voltarParaListagem() {
    this.router.navigate(['/prestacao/conta/lista']);
  }


  

  buscarPorData(event) {
    var dataRecebida = event.target.value;

    if (dataRecebida.length == 7) {
      var mes = dataRecebida.substring(0, 2);
      var ano = dataRecebida.substring(3);
      var data = new Date(ano, mes, 0);
      var qtdDias = data.getDate();
      this.dataInicial = "01/" + dataRecebida;
      this.dataFinal = qtdDias + "/" + dataRecebida;
      this.servicoPrestadoService.buscarDate(this.dataInicial, this.dataFinal)
        .subscribe(response => {
          this.servicoPrestadoBusca = response
          this.errors = null;
          if (this.servicoPrestadoBusca.length == 0) {
            this.servicoPrestadoBuscaSelecionado.id = null
          }
        }, reject => {
          this.servicoPrestadoBusca = null
          this.servicoPrestadoBuscaSelecionado.id = null;
          this.errors = reject.error.erros;
          this.success = false;
        })
    } else {
      this.servicoPrestadoBusca = null
      this.servicoPrestadoBuscaSelecionado.id = null

    }
  }

  teste() {

    this.relatorio = true;

  }



}