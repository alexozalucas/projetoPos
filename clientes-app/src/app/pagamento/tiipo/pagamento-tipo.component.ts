import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PagamentoService } from '../../pagamento.services'
import { TipoPagamento } from '../tipo-pagamento';


@Component({
  selector: 'app-pagamento-tipo',
  templateUrl: './pagamento-tipo.component.html',
  styleUrls: ['./pagamento-tipo.component.css']
})
export class Pagamento implements OnInit {


  tipoPagamento: TipoPagamento;
  id: number;
  mensagemSucesso: String;
  isLoading: boolean = false;
  success: boolean;
  errors: String[];


  constructor(private service: PagamentoService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.tipoPagamento = new TipoPagamento();
  }

  ngOnInit() {

    this.close();
    this.isLoading = true;
    let params: Observable<Params> = this.activatedRouter.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getTipoServicoById(this.id)
          .subscribe(
            response => {
              this.tipoPagamento = response;
              this.isLoading = false;
            }, erro => {
              this.tipoPagamento = new TipoPagamento()
              this.isLoading = false;
              this.errors = erro.error.erros
              if (this.errors == undefined) {
                this.errors = ["Ocorreu um erro ao carregar os tipos de pagamento"]
              }
            });
      } else {
        this.isLoading = false;
      }

    })
  }

  close() {
    this.errors = [];
    this.success = false;
  }

  // Metodo para atualizar e salvar cliente no Clientes-form.Component.html
  onSubmit() {

    this.close();
    this.isLoading = true;
    if (this.tipoPagamento.id) {

      this.service.atualizar(this.tipoPagamento)
        .subscribe(response => {
          this.success = true;
          this.isLoading = false;
          this.tipoPagamento = response;
          this.mensagemSucesso = "Tipo de pagamento atualizado com sucesso";
        }, erro => {
          this.isLoading = false;
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao atualizar o tipo de pagamento"]
          }
        });

    } else {

      this.service.salvar(this.tipoPagamento)
        .subscribe(response => {
          this.success = true;
          this.isLoading = false;
          this.tipoPagamento = response;
          this.mensagemSucesso = "Tipo de pagamento salvo com sucesso";
        }, erro => {
          this.isLoading = false;
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao salvar o tipo de pagamento"]
          }
        });

    }
  }


  voltarParaListagem() {
    this.router.navigate(['/pagamento/tipo/lista']);
  }
}