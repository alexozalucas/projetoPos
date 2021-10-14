import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagamentoService } from 'src/app/pagamento.services';
import { TipoPagamento } from '../tipo-pagamento';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-pagamento-tipo-lista',
  templateUrl: './pagamento-tipo-lista.component.html',
  styleUrls: ['./pagamento-tipo-lista.component.css']
})

export class PagamentoTipoLista implements OnInit {

  tipoPagamento: TipoPagamento[] = [];
  tipoPagamentoSelecionado: TipoPagamento;
  mensagemSucesso: String;  
  public paginaAtual = 1;
  tipoPagamentoFilter: TipoPagamento[];
  valorPesquisado: String = "";
  isLoading: boolean = false;
  success: boolean;
  errors: String[];


  constructor(
    private service: PagamentoService,
    private router: Router) { }

  ngOnInit() {
    this.close();
    this.listarTipoPagamento();
    
  }

  listarTipoPagamento(){
   
    this.isLoading = true;
    this.service.getTipoPagamento()
      .subscribe(response => {
        this.isLoading = false;
        this.tipoPagamento = response;
        this.tipoPagamentoFilter = response;
        this.filtrar(this.valorPesquisado)
      }, erro => {
        this.isLoading = false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao carregar os tipos de pagamento"]
        }
      });

  }

  public novoCadastro() {
    this.router.navigate(['/pagamento/tipo']);
  }

  preparaDelecao(tipoPagamento: TipoPagamento) {
    this.tipoPagamentoSelecionado = tipoPagamento;
  }

  close() {
    this.errors = [];
    this.success = false;
  }


  deletarTipoPagamento(tipoPagamento: TipoPagamento) {
    this.close();
    this.isLoading = true;
    this.service.deletar(this.tipoPagamentoSelecionado)
      .subscribe(response => {
        this.isLoading = false
        this.success = true;
        this.mensagemSucesso = "Tipo de pagamento deletado com sucesso "
        this.listarTipoPagamento();
      }, erro => {
        this.isLoading = false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao deletar o tipo de pagamento"]
        }
      });
  }

  filtrar(value: String) {
    if (!value) {
      this.tipoPagamento = this.tipoPagamentoFilter;
    } else {
      this.tipoPagamento = this.tipoPagamentoFilter.filter(x =>
        x.type.trim().toLowerCase().includes(value.trim().toLowerCase())
      );
    }
    this.valorPesquisado = value;
  }

}