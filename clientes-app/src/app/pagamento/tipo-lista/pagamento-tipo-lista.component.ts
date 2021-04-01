import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagamentoService } from 'src/app/pagamento.services';
import { TipoPagamento } from '../tipo-pagamento';
import {NgxPaginationModule} from 'ngx-pagination';


@Component({
  selector: 'app-pagamento-tipo-lista',
  templateUrl: './pagamento-tipo-lista.component.html',
  styleUrls: ['./pagamento-tipo-lista.component.css']
})

export class PagamentoTipoLista implements OnInit {

  tipoPagamento: TipoPagamento[] = [];
  tipoPagamentoSelecionado: TipoPagamento;
  mensagemSucesso: String;
  mensagemErro: String;
  public paginaAtual = 1;
  tipoPagamentoFilter: TipoPagamento[];
  valorPesquisado: String = "";

  constructor(
    private service: PagamentoService,
    private router: Router) { }

  ngOnInit() {

    this.service.getTipoPagamento()
      .subscribe(response => {
        this.tipoPagamento = response;
        this.tipoPagamentoFilter = response;
        this.filtrar(this.valorPesquisado)
      });
  }

  public novoCadastro() {
    this.router.navigate(['/pagamento/tipo']);
  }

  preparaDelecao(tipoPagamento: TipoPagamento) {
    this.tipoPagamentoSelecionado = tipoPagamento;
  }


  deletarTipoPagamento(tipoPagamento: TipoPagamento) {
    this.service.deletar(this.tipoPagamentoSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = "Tipo de pagamento deletado com sucesso: "
        this.ngOnInit();
      },
        erro => this.mensagemErro = "Ocorreu erro ao deletar tipo de pagamento"
      );
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