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
          this.tipoPagamento.map(v => v.search = v.id + " - "+v.type); 
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
    const documento = new jsPDF();
    
    documento.setFont("Courier");
    documento.setFontSize(15);
    documento.text("Relatório de prestação de contas", 60, 12);

    // Parte do relatório destinada a cliente
    documento.setFontSize(12);
    documento.text("Cliente:", 10, 25);

    documento.setFillColor(50, 50, 50);
    documento.rect(10, 30, 30, 8, "FD");
    documento.rect(10, 38, 30, 8, "FD");  
    documento.rect(40, 30, 160, 8, "S");
    documento.rect(40, 38, 160, 8, "S");

    documento.setFontSize(10);
    documento.setTextColor(255, 255, 255);
    documento.text("Nome", 12, 36);
    documento.text("CPF", 12, 44);

    documento.setFont("Normal");
    documento.setTextColor(0, 0, 0);
    documento.text(this.prestacaoContasBuscar.serviceProvided.client.name, 42, 36);
    documento.text(this.prestacaoContasBuscar.serviceProvided.client.cpf, 42, 44);
  
    // Parte do relatório destinada ao serviço prestado
    documento.setFontSize(12);
    documento.text("Serviço prestado:", 10, 55);

    documento.setFillColor(50, 50, 50);
    documento.rect(10, 61, 30, 8, "FD");
    documento.rect(10, 69, 30, 8, "FD");
    documento.rect(10, 77, 30, 8, "FD");
    documento.rect(10, 85, 30, 8, "FD");
    documento.rect(10, 93, 30, 8, "FD");
    documento.rect(40, 61, 160, 8, "S");
    documento.rect(40, 69, 160, 8, "S");
    documento.rect(40, 77, 160, 8, "S");
    documento.rect(40, 85, 160, 8, "S");
    documento.rect(40, 93, 160, 8, "S");
    

    documento.setFontSize(10);
    documento.setTextColor(255, 255, 255);
    documento.text("ID", 12, 67);
    documento.text("Descrição", 12, 75);
    documento.text("Data", 12, 83);
    documento.text("Tipo serviço", 12, 91);
    documento.text("Valor fechado", 12, 99);
  
    var pageWidth = 158,	 
	  margin = 0.5,
	  maxLineWidth = pageWidth - margin * 2;
    var description = documento.splitTextToSize(this.prestacaoContasBuscar.serviceProvided.description, maxLineWidth);
    
    documento.setFont("Normal");
    documento.setTextColor(0, 0, 0);
    documento.text(this.prestacaoContasBuscar.serviceProvided.id+"", 42, 67);
    documento.text(description, 42, 75);
    documento.text(this.prestacaoContasBuscar.serviceProvided.date, 42, 83);
    documento.text(this.prestacaoContasBuscar.serviceProvided.typeService.service, 42, 91);
    documento.text(this.prestacaoContasBuscar.serviceProvided.value+"", 42, 99);
   
    // Parte do relatório destinada a prestação de contas
    documento.setFontSize(12);
    documento.text("Prestação de contas:", 10, 110);

    documento.setFillColor(50, 50, 50);
    documento.rect(10, 118, 30, 8, "FD");
    documento.rect(10, 126, 30, 8, "FD");
    documento.rect(10, 134, 30, 8, "FD");
    documento.rect(10, 142, 30, 8, "FD");
    documento.rect(10, 150, 30, 8, "FD");
    documento.rect(10, 158, 30, 8, "FD");
    documento.rect(40, 118, 160, 8, "S");
    documento.rect(40, 126, 160, 8, "S");
    documento.rect(40, 134, 160, 8, "S");
    documento.rect(40, 142, 160, 8, "S");
    documento.rect(40, 150, 160, 8, "S");
    documento.rect(40, 158, 160, 8, "S")

    documento.setFontSize(10);
    documento.setTextColor(255, 255, 255);
    documento.text("Desconto", 12, 124);
    documento.text("Acrescimo", 12, 132);
    documento.text("Valor Total", 12, 140);
    documento.text("Observação", 12, 148);
    documento.text("Tipo de pagamento", 12, 156);
    documento.text("Data Pagamento", 12, 164);

    documento.setFont("Normal");
    documento.setTextColor(0, 0, 0);
    documento.text(this.prestacaoContasBuscar.discountValue+"", 42, 124);
    documento.text(this.prestacaoContasBuscar.additionValue+"", 42, 132);
    documento.text(this.prestacaoContasBuscar.totalValue+"", 42, 140);
    documento.text(this.prestacaoContasBuscar.observation, 42, 148);
    documento.text(this.prestacaoContasBuscar.typePayment.type, 42, 156);
    documento.text(this.retornaDatePaymentFormat(this.prestacaoContasBuscar.datePayment), 42, 164)

    documento.output("dataurlnewwindow");
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
          this.servicoPrestadoBusca.map(v => v.search = v.id + " - "+v.client.name+" - "+v.typeService.service );
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