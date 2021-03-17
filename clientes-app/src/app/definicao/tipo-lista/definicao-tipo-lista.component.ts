import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefinicaoService } from 'src/app/definicao.service';
import { TipoServico } from '../tipo-servico';



@Component({
  selector: 'app-definicao-tipo-lista',
  templateUrl: './definicao-tipo-lista.component.html',
  styleUrls: ['./definicao-tipo-lista.component.css']
})

export class TipoServicoListaComponent implements OnInit {

  tipoServicos: TipoServico[] = [];
  tipoServicoSelecionado: TipoServico;
  mensagemSucesso: String;
  mensagemErro: String;

  constructor(
    private service: DefinicaoService,
    private router: Router) { }

  ngOnInit() {

    this.service.getTipoServicos()
      .subscribe(response => {
        this.tipoServicos = response;
      });
  }

  public novoCadastro() {
    this.router.navigate(['/definicao/tipo']);
  }

  preparaDelecao(tipoServico: TipoServico) {
    this.tipoServicoSelecionado = tipoServico;
  }


  deletarTipoServico(tipoServico: TipoServico) {
    this.service.deletar(this.tipoServicoSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = "Tipo de serviço deletado com sucesso"
        this.ngOnInit();
      },
        erro => this.mensagemErro = "Ocorreu erro ao deletar tipo de serviço"
      );

  }

}
