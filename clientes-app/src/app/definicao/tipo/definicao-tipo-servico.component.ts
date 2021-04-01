import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DefinicaoService } from 'src/app/definicao.service';
import { TipoServico } from '../tipo-servico';

@Component({
  selector: 'app-definicao-tipo-servico',
  templateUrl: './definicao-tipo-servico.component.html',
  styleUrls: ['./definicao-tipo-servico.component.css']
})
export class DefinicaoTipoServico implements OnInit {


  tipoServico: TipoServico;
  success: boolean = false;
  errors: String[];
  id: number;


  constructor(private service: DefinicaoService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.tipoServico = new TipoServico();
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRouter.params    
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if(this.id){
        this.service
        .getTipoServicoById(this.id)
        .subscribe(
          response => this.tipoServico = response
          , reject => this.tipoServico = new TipoServico()          
        )

      }

    })

  }

  onSubmit() {

    if (this.tipoServico.id) {

      this.service.atualizar(this.tipoServico)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.tipoServico = response;
        }, reject => {
          this.errors = reject.error.erros;
          this.success = false;

        })

    } else {

      this.service.salvar(this.tipoServico)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.tipoServico = response;


        }, errorResponse => {
          this.errors = errorResponse.error.erros;
          this.success = false;
        })

    }
  }


  voltarParaListagem() {
    this.router.navigate(['/definicao/tipo/lista']);
  }
}