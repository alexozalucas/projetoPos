import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PagamentoService} from '../../pagamento.services'
import { TipoPagamento } from '../tipo-pagamento';


@Component({
  selector: 'app-pagamento-tipo',
  templateUrl: './pagamento-tipo.component.html',
  styleUrls: ['./pagamento-tipo.component.css']
})
export class Pagamento implements OnInit {


  tipoPagamento: TipoPagamento;
  success: boolean = false;
  errors: String[];
  id: number;
  messageSuccess : String;


  constructor(private service: PagamentoService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.tipoPagamento = new TipoPagamento();
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRouter.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if(this.id){
        this.service
        .getTipoServicoById(this.id)
        .subscribe(
          response => this.tipoPagamento = response
          , reject => this.tipoPagamento = new TipoPagamento()          
        )

      }

    })

  }

  // Metodo para atualizar e salvar cliente no Clientes-form.Component.html
  onSubmit() {

    if (this.tipoPagamento.id) {

      this.service.atualizar(this.tipoPagamento)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.tipoPagamento = response;
          this.messageSuccess = "Tipo de pagamento atualizado com sucesso";
        }, reject => {
          this.errors = reject.error.erros;
          this.success = false;

        })

    } else {

      this.service.salvar(this.tipoPagamento)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.tipoPagamento = response;
          this.messageSuccess = "Tipo de pagamento salvo com sucesso";
        }, errorResponse => {
          this.errors = errorResponse.error.erros;
          this.success = false;
        })

    }
  }


  voltarParaListagem() {
    this.router.navigate(['/pagamento/tipo/lista']);
  }
}