import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PrestaContasService } from 'src/app/presta-contas.services';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from 'src/app/servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import { PrestacaoContasBuscar } from '../contas-lista/prestacao-contas-buscar';
import { PagamentoService } from '../../pagamento.services';
import { TipoPagamento } from 'src/app/pagamento/tipo-pagamento';
import { PrestacaoContas } from '../prestacao-conta';
import { DateUtil } from 'src/app/util/Date-Util';
import { jsPDF } from "jspdf";
import { Dropdown } from 'primeng/dropdown';
import autoTable from 'jspdf-autotable';

import 'jspdf-autotable'



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
  prestacaoContas: PrestacaoContas;
  valorTotal: string;
  mensagemSucesso: string;
  isLoading: boolean = false;



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
    this.prestacaoContas = new PrestacaoContas();
  }

  ngOnInit() {


    this.close();
    this.isLoading = true;
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
            },
            erro => {
              this.errors = erro.error.erros;
              this.prestacaoContasBuscar = new PrestacaoContasBuscar();
              if (this.errors == undefined) {
                this.errors = ["Ocorreu um erro carregar a prestação de contas!"]
              }
            }
          );
      }
      this.isLoading = false;
    });


    if (this.errors.length == 0) {
      this.close();
      this.isLoading = true;
      this.pagamentoService.getTipoPagamento()
        .subscribe(response => {
          this.tipoPagamento = response;
          this.tipoPagamento.map(v => v.search = v.id + " - " + v.type);
          this.isLoading = false;
        }, erro => {
          this.errors = erro.error.erros;
          this.isLoading = false;
          if (this.errors == undefined) {
            this.errors = ["Ocorreu erro ao se comunicar com o servidor!"]
          }
        });
    }

  }

  close() {
    this.errors = [];
    this.success = false;
  }

  gerarPDF() {
    let doc = new jsPDF();

    // Parte do relatório destinada a cliente
    const clientcolumns = [['Clientes', '']];
    const client = [
      ['Nome', this.prestacaoContasBuscar.serviceProvided.client.name],
      ['CPF', this.prestacaoContasBuscar.serviceProvided.client.cpf]
    ];

    autoTable(doc, {
      head: clientcolumns,
      body: client,
      columnStyles: { 0: { cellWidth: 20 } },
      didDrawPage: (dataArg) => {
        doc.text('Relatório de prestação de contas', dataArg.settings.margin.left, 10);
      }
    });


    // Parte do relatório destinada ao serviço prestado
    const providerServiceColumns = [['Serviço Prestado', '']];
    const providerService = [
      ['ID', this.prestacaoContasBuscar.serviceProvided.id],
      ['Descrição', this.prestacaoContasBuscar.serviceProvided.description],
      ['Data', this.prestacaoContasBuscar.serviceProvided.date],
      ['Tipo serviço', this.prestacaoContasBuscar.serviceProvided.typeService.service],
      ['Valor fechado', this.prestacaoContasBuscar.serviceProvided.value]
    ];

    autoTable(doc, {
      head: providerServiceColumns,
      body: providerService,
      columnStyles: { 0: { cellWidth: 40 } },
      didDrawPage: (dataArg) => {
        doc.text('', dataArg.settings.margin.left, 10);
      }
    });


     // Parte do relatório destinada a prestação de contas
     const accountabilityColumns = [['Prestação de contas', '']];
     const accountability = [
       ['Desconto', this.prestacaoContasBuscar.discountValue],
       ['Acrescimo', this.prestacaoContasBuscar.additionValue],
       ['Valor Total', this.prestacaoContasBuscar.totalValue],
       ['Observação', this.prestacaoContasBuscar.observation],
       ['Tipo de pagamento', this.prestacaoContasBuscar.typePayment.type],
       ['Data Pagamento', this.retornaDatePaymentFormat(this.prestacaoContasBuscar.datePayment)]
     ];
 
     autoTable(doc, {
       head: accountabilityColumns,
       body: accountability,
       columnStyles: { 0: { cellWidth: 40 } },
       didDrawPage: (dataArg) => {
         doc.text('', dataArg.settings.margin.left, 10);
       }
     });
 
     doc.output("dataurlnewwindow");
  }


  emitirRelatorio() {
    this.relatorio = true;
  }

  onSubmit() {

    if (!this.prestacaoContasBuscar.id) {
      this.prestacaoContasBuscar.serviceProvided = this.servicoPrestadoBuscaSelecionado;
    }

    this.prestacaoContas.id = this.prestacaoContasBuscar.id;
    this.prestacaoContas.id_serviceProvided = this.prestacaoContasBuscar.serviceProvided.id;
    this.prestacaoContas.datePayment = DateUtil.dateFormat(this.prestacaoContasBuscar.datePayment);
    this.prestacaoContas.additionValue = DateUtil.validarValorDefault(this.prestacaoContasBuscar.additionValue);
    this.prestacaoContas.discountValue = DateUtil.validarValorDefault(this.prestacaoContasBuscar.discountValue);
    this.prestacaoContas.observation = this.prestacaoContasBuscar.observation;
    this.prestacaoContas.totalValue = DateUtil.validarValorDefault(this.valorTotal);

    this.prestacaoContas.idTypePayment = this.tipoPagamentoSelecionado.id;
    this.close();
    this.isLoading = true;
    this.service.salvar(this.prestacaoContas)
      .subscribe(response => {
        this.success = true;
        this.isLoading = false;
        if (this.prestacaoContasBuscar.id != undefined) {
          this.mensagemSucesso = "Pestação de contas atualizado com sucesso!";
        } else {
          this.mensagemSucesso = "Pestação de contas salvo com sucesso!";
        }
        this.prestacaoContasBuscar = response;
      }, erro => {
        this.errors = erro.error.erros;
        this.isLoading = false;
        this.success = false;
        if (this.errors == undefined) {
          this.errors = ["Ocorreu erro ao se comunicar com o servidor!"];
        }
      });
  }

  voltarParaListagem() {
    this.router.navigate(['/prestacao/conta/lista']);
  }



  somarTotal(value: string, additionValue: string, discountValue: string) {

    this.valorTotal = ((parseFloat(DateUtil.validarValorDefault(value)) + parseFloat(DateUtil.validarValorDefault(additionValue))) - parseFloat(DateUtil.validarValorDefault(discountValue))).toString();
    if (this.valorTotal < "0") {
      this.valorTotal = "0";
    }
    return this.valorTotal.replace(".", ",");
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
      this.close();
      this.isLoading = true;
      this.servicoPrestadoService.buscarDate(this.dataInicial, this.dataFinal)
        .subscribe(response => {
          this.servicoPrestadoBusca = response;
          this.servicoPrestadoBusca.map(v => v.search = v.id + " - " + v.client.name + " - " + v.typeService.service);
          this.errors = null;
          this.isLoading = false;
          if (this.servicoPrestadoBusca.length == 0) {
            this.servicoPrestadoBuscaSelecionado.id = null
          }
        }, erro => {
          this.servicoPrestadoBusca = null
          this.servicoPrestadoBuscaSelecionado.id = null;
          this.errors = erro.error.erros;
          this.isLoading = false;
          this.success = false;
          if (this.errors == undefined) {
            this.errors = ["Ocorreu erro ao se comunicar com o servidor!"];
          }
        });
    } else {
      this.servicoPrestadoBusca = null
      this.servicoPrestadoBuscaSelecionado.id = null

    }
  }

  retornaDatePaymentFormat(data: string): string {
    return DateUtil.dateFormat(data);
  }

  clearFilter(dropdown: Dropdown) {
    dropdown.resetFilter();
  }



}