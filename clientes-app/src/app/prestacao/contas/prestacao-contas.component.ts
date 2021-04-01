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
  valorTotal : string;
  messageSuccess : string;


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


  emitirRelatorio(){
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
    this.prestacaoContas.totalValue =   DateUtil.validarValorDefault(this.valorTotal);

    this.prestacaoContas.idTypePayment = this.tipoPagamentoSelecionado.id;
    this.service.salvar(this.prestacaoContas)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        
        if(this.prestacaoContasBuscar.id != undefined){
          this.messageSuccess = "Pestação de contas atualizado com sucesso!";          
        }else {
          this.messageSuccess = "Pestação de contas salvo com sucesso!";
        }
        
        this.prestacaoContasBuscar = response;
        
      }, reject => {
        this.errors = reject.error.erros;
        this.success = false;
      })
  }

  voltarParaListagem() {
    this.router.navigate(['/prestacao/conta/lista']);
  }



  somarTotal(value: string, additionValue: string, discountValue: string) {

    this.valorTotal = ((parseFloat(DateUtil.validarValorDefault(value)) + parseFloat(DateUtil.validarValorDefault(additionValue))) - parseFloat(DateUtil.validarValorDefault(discountValue))).toString();
    if(this.valorTotal < "0"){
      this.valorTotal = "0";
    }
    return this.valorTotal.replace(".",",");
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

  retornaDatePaymentFormat(data : string): string {   
    return DateUtil.dateFormat(data);
  }



}