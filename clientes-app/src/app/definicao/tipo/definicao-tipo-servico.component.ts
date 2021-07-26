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
  isLoading: boolean = false;
  mensagemSucesso: String;


  constructor(private service: DefinicaoService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.tipoServico = new TipoServico();
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
              this.tipoServico = response
            }
            , erro => {
              this.errors = erro.error.erros;
              if (this.errors == undefined) {
                this.errors = ["Ocorreu erro ao carregar o tipo de serviço"]
              }         
              this.tipoServico = new TipoServico();
            }
          )
      }
    })
    this.isLoading = false;
  }

  close() {
    this.errors = [];
    this.success = false;
  }

  onSubmit() {

    this.close();
    this.isLoading = true;
    if (this.tipoServico.id) {

      this.service.atualizar(this.tipoServico)
        .subscribe(response => {
          this.success = true;  
          this.tipoServico = response;
          this.isLoading = false;
          this.mensagemSucesso = "Tipo de serviço atualizado com sucesso!"
        }, erro => {
          this.isLoading = false;
          this.errors = erro.error.erros;
              if (this.errors == undefined) {
                this.errors = ["Ocorreu erro ao atualizar tipo de serviço"]
              }    
        })

    } else {

      this.service.salvar(this.tipoServico)
        .subscribe(response => {
          this.success = true;  
          this.isLoading = false;       
          this.tipoServico = response;
          this.mensagemSucesso = "Tipo de serviço salvo com sucesso!"

        }, erro => {
          this.isLoading = false;
          this.errors = erro.error.erros;
          if (this.errors == undefined) {
            this.errors = ["Ocorreu erro ao salvar tipo de serviço"]
          }                 
        })

    }
  }


  voltarParaListagem() {
    this.router.navigate(['/definicao/tipo/lista']);
  }
}