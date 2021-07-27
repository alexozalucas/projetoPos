import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestaContasService } from 'src/app/presta-contas.services';
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
  public paginaAtual = 1;
  prestacaoContasFiltro: PrestacaoContasBuscar[] = [];
  valorPesquisado: String = "";
  isLoading: boolean = false;
  success: boolean;
  errors: String[]


  constructor(
    private service: PrestaContasService,
    private router: Router) { }

  ngOnInit() {

    this.close();
    this.isLoading = true;
    this.service.getPrestacaoContas()
      .subscribe(response => {
        this.prestacaoContas = response;
        this.prestacaoContasFiltro = response;
        this.filtrar(this.valorPesquisado)
        this.isLoading = false;
      },
        erro => {
          this.errors = erro.error.erros;
          this.isLoading = false;
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao carregar os serviços prestados!"]
          }
        }
      );


  }

  public novoCadastro() {
    this.router.navigate(['/prestacao/conta']);
  }

  preparaDelecao(prestacaoContas: PrestacaoContasBuscar) {
    this.prestacaoContasSelecionado = prestacaoContas;
  }

  close() {
    this.errors = [];
    this.success = false;
  }


  deletarPrestacaoConta() {
    this.close();
    this.isLoading = true;
    this.service.deletar(this.prestacaoContasSelecionado)
      .subscribe(
        response => {
          this.ngOnInit();
          this.mensagemSucesso = "prestação de conta deletada com sucesso"
          this.success = true;
        },
        erro => {
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu erro ao deletar a prestação de conta!"]
          }
        }
      );
    this.isLoading = false;
  }

  filtrar(value: String) {
    if (!value) {
      this.prestacaoContas = this.prestacaoContasFiltro;
    } else {
      this.prestacaoContas = this.prestacaoContasFiltro.filter(x => {
        if (x.serviceProvided.description.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
          String(x.id).trim().toLowerCase().includes(value.trim().toLowerCase()) ||
          x.serviceProvided.client.name.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
          x.typePayment.type.trim().toLowerCase().includes(value.trim().toLowerCase())) {
          return true;
        }
      });
    }
    this.valorPesquisado = value;
  }

}
