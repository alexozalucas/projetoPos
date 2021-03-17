import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestaContasService } from 'src/app/presta-contas.services';
import { PrestacaoContas } from '../prestacao-conta';
import { PrestacaoContasBuscar } from './prestacao-contas-buscar';

@Component({
  selector: 'app-prestacao-contas-lista',
  templateUrl: './prestacao-contas-lista.component.html',
  styleUrls: ['./prestacao-contas-lista.component.css']
})

export class PrestacaoContasListaComponent implements OnInit {

  prestacaoContas: PrestacaoContasBuscar[] = [];
  prestacaoContasSelecionado: PrestacaoContasBuscar;
  mensagemSucesso: String;
  mensagemErro: String;


  constructor(
    private service: PrestaContasService,
    private router: Router) { }

  ngOnInit() {

    this.service.getPrestacaoContas()
      .subscribe(response => {
        this.prestacaoContas = response;
      });
  }

  public novoCadastro() {
    this.router.navigate(['/prestacao/conta']);
  }

  preparaDelecao(prestacaoContas: PrestacaoContasBuscar) {
    this.prestacaoContasSelecionado = prestacaoContas;
  }


  deletarPrestacaoConta(prestacaoContas: PrestacaoContas) {
    this.service.deletar(this.prestacaoContasSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = "Tipo de serviço deletado com sucesso"
        this.ngOnInit();
      },
        erro => this.mensagemErro = "Ocorreu erro ao deletar tipo de serviço"
      );

  }

}
