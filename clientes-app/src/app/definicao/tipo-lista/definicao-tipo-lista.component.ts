import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefinicaoService } from 'src/app/definicao.service';
import { TipoServico } from '../tipo-servico';
import {NgxPaginationModule} from 'ngx-pagination';


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
  public paginaAtual = 1;
  tipoServicosFilter : TipoServico[];
  valorPesquisado: String = "";

  constructor(
    private service: DefinicaoService,
    private router: Router) { }

  ngOnInit() {

    this.service.getTipoServicos()
      .subscribe(response => {
        this.tipoServicos = response;
        this.tipoServicosFilter = response;
        this.filtrar(this.valorPesquisado);
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


  filtrar(value: String) {
    if (!value) {
      this.tipoServicos = this.tipoServicosFilter;
    } else {
      this.tipoServicos = this.tipoServicosFilter.filter(x => 
        x.service.trim().toLowerCase().includes(value.trim().toLowerCase())
      );
    }
    this.valorPesquisado = value;
  }

}
