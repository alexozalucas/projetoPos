import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../agenda.service';
import { AnotacaoService } from '../anotacao.service';
import { DateUtil } from '../util/Date-Util';
import { Agenda } from './agenda'
import { Anotacao } from './anotacao';
import { TipoAnotacao } from './tipoAnotacao';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options: any;
  paginaAtualAgenda: number = 0;
  paginaAtualAnotacao: number = 0;
  dateInitial: string = null;
  dateFinal: string = null;
  listaAgenda: Agenda[];
  mensagemErro: string;
  mensagemSucesso: string;
  agenda: Agenda;
  success: boolean = false;
  errors: String[];
  telaEdicao: boolean = false;
  agendaSelecionada: Agenda;
  anotacaoLista: Anotacao[];
  anotacaoListaFilter: Anotacao[];
  tipoAnotacaoLista: TipoAnotacao[];
  anotacao: Anotacao;
  tipoAnotacao: TipoAnotacao;
  anotacaoSelecionada: Anotacao;
  tipoAnotacaoSelecionado: TipoAnotacao;
  isLoading: boolean = false;

  // 1 - lista de anotação, 2 - cadastro/edição da anotação,
  // 3 - Cadastro do tipo de anotação, 4 - listar tipo de anotação
  mostrarListaAnotacao: number = 1;



  constructor(
    private agendaService: AgendaService,
    private anotacaoService: AnotacaoService,

  ) {
    this.agenda = {} as Agenda;
    this.anotacao = {} as Anotacao;
    this.tipoAnotacao = {} as TipoAnotacao;
  }

  ngOnInit() {
  }

  preparaDelecao(agenda: Agenda) {
    this.agendaSelecionada = agenda;
    this.close();
  }

  deletarAgenda(agenda: Agenda) {
    this.errors = [];

    this.agendaService.deletar(agenda)
      .subscribe(response => {
        this.agendaSelecionada = undefined;
        this.mensagemSucesso = "Agenda deletada com sucesso";
        this.success = true;
        this.mostrarAgenda();
      }, erro => {
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao deletar a agenda"]
        }
      });

  }


  mostrarAgenda() {

    this.close();
    var dateFinalFormat = DateUtil.dateFormat(this.dateFinal);
    var dateInitialFormat = DateUtil.dateFormat(this.dateInitial);
    if ((dateFinalFormat == "" || dateInitialFormat == "") && (!this.telaEdicao)) {
      this.errors = ["Favor informar as data corretamente!"]
    } else {

      this.isLoading = true;
      this.agendaService.getAgendaBydate(dateInitialFormat, dateFinalFormat)
        .subscribe(response => {
          this.listaAgenda = response;
          this.mostrarTipoAnotacao();
          this.isLoading = false;
        },
          erro => {
            this.errors = ["Ocorreu um erro ao consultar agenda!"]
            this.isLoading = false;
          }
        );
    }


  }

  selecionarAgendaPorId(id: number) {
    this.close();
    this.isLoading = true;
    this.agendaService.getAgendaById(id)
      .subscribe(response => {
        this.agenda = response;
        this.telaEdicao = true;
        this.isLoading = false;
      }, erro => {
        this.isLoading = false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao editar a agenda"]
        }
      });
  }

  voltarParaListagemAgenda() {

    this.agenda = new Agenda();
    this.close();
    this.mostrarAgenda();
    this.telaEdicao = false;
  }

  onSubmit() {
    this.isLoading = true;
    this.close();
    this.agenda.date = DateUtil.dateFormat(this.agenda.date);
    this.agendaService.salvar(this.agenda)
      .subscribe(response => {
        this.success = true;
        this.isLoading = false;
        if (this.agenda.id > 0) {
          this.mensagemSucesso = "Agenda editada com sucesso";
        } else {
          this.mensagemSucesso = "Agenda salva com sucesso";
          this.agenda = {} as Agenda;
        }

      },
        erro => {
          this.isLoading = false;
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao salvar/editar a agenda"]
          }
        });
  }

  cadastroNovo() {
    this.close();
    this.telaEdicao = true;
  }

  close() {
    this.errors = [];
    this.success = false;
  }

  selecionarAbaAgenda() {
    this.isLoading = false;
    this.close();


  }



  // Metodos da aba anotação

  selecionarAnotacaoPorId(id: number) {
    
    this.close();
    this.isLoading = true;
    this.mostrarTipoAnotacao();    
    this.anotacaoService.getAnotacaoById(id)
      .subscribe(response => {
        this.anotacao = response;
        this.mostrarListaAnotacao = 2;
        this.tipoAnotacao.id = response.typeAnnotation.id;
        this.isLoading = false;
      },
        erro => {
          this.errors = ["Ocorreu um erro ao selecionar a anotação"]
          this.isLoading = false;
        }
      );

  }

  voltarParaListagemAnotacao() {
    this.close();
    this.mostrarAnotacao();
    this.mostrarListaAnotacao = 1;
  }


  preparaDelecaoAnotacao(anotacao: Anotacao) {
    this.close();
    this.anotacaoSelecionada = anotacao;
  }

  mostrarAnotacao() {
    // Retorna todas as anotação 
    this.close();
    this.anotacao = {} as Anotacao;
    this.anotacaoLista = [];
    this.isLoading = true;
    this.anotacaoService.getAllAnotacao()
      .subscribe(response => {
        this.anotacaoLista = response;
        this.anotacaoListaFilter = response;
        this.isLoading = false;
      }, erro => {
        this.isLoading = false;
        this.anotacaoListaFilter = [];
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao mostrar as anotações"]
        }
      });
  }

  deletarAnotacao() {
    this.isLoading = true;
    this.anotacaoService.deletarAnotacao(this.anotacaoSelecionada)
      .subscribe(response => {
        this.anotacaoSelecionada = undefined;
        this.mensagemSucesso = "Anotação deletada com sucesso";
        this.success = true;
        this.isLoading = false;
        this.mostrarAnotacao();
      }, erro => {
        this.isLoading = false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao deletar a anotação"]
        }
      });

  }

  onSubmitAnotacao() {

    this.close();
    this.isLoading =true;
    this.anotacaoService.salvarAnotacao(this.anotacao)
      .subscribe(response => {
        this.isLoading =false;
        this.success = true;
        if (this.anotacao.id > 0) {
          this.mensagemSucesso = "Anotação editada com sucesso";
        } else {
          this.mensagemSucesso = "Anotação salva com sucesso";
          this.anotacao = response;
        }
        
      },
        erro => {
          this.isLoading =false;
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao salvar/editar a anotação"]
          }
        });

  }

  novoCadastroAnotacao() {
    this.anotacao = {} as Anotacao;
    this.tipoAnotacao = {} as TipoAnotacao;
    this.anotacao.typeAnnotation = this.tipoAnotacao;
    this.mostrarListaAnotacao = 2;
    this.close();
    this.mostrarTipoAnotacao();
  }



  filtrarAnotacao(value: string) {
    if (!value) {
      this.anotacaoLista = this.anotacaoListaFilter;
    } else {
      this.paginaAtualAnotacao = 0;
      this.anotacaoLista = this.anotacaoListaFilter.filter(x => {
        if (x.title.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
          (x.typeAnnotation.type.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
            (x.typeAnnotation.id.toString().trim().includes(value.trim().toString())))) {
          return true;
        }
      });
    }

  }



  // Parte de código para tratar os tipos de anotação
  mostrarTipoAnotacao() {
  
    this.anotacaoService.getAllTipoAnotacao()
      .subscribe(response => {
        this.tipoAnotacaoLista = response;
      }, erro => {
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao carregar os tipos de anotação"]
        }
      });
  }

  // PARTE DO CÓDIGO PARA TIPO DE ANOTAÇÃO

  novoCadastroTipoDeAnotacao() {
    this.mostrarListaAnotacao = 3;
    this.tipoAnotacao = {} as TipoAnotacao;
  }

  voltarParaCadastrodeAnotacao() {
    this.mostrarListaAnotacao = 2;
    this.close();
  }


  buscarTipoDeAnotacaoPorId() {
   
    this.anotacaoService.getTipoAnotacaoById(this.anotacao.typeAnnotation.id)
      .subscribe(response => {
        this.tipoAnotacao = response;

      }, erro => {

        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro no retorno do tipo de anotação"]
        }
      });
  }


  onSubmitTipoAnotacao() {
    this.close();
    this.isLoading = true;
    if (this.tipoAnotacao.id) {
      this.anotacaoService.atualizarTipoAnotacao(this.tipoAnotacao)
        .subscribe(response => {
          this.isLoading = false;
          this.success = true;
          this.mensagemSucesso = "Tipo de anotação editada com sucesso";
          this.tipoAnotacao = response;
          this.mostrarTipoAnotacao();

        }, erro => {
          this.isLoading = false;
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao salvar/editar o tipo de anotação"]
          }
        });
    } else {

      this.anotacaoService.salvarTipoAnotacao(this.tipoAnotacao)
        .subscribe(response => {
          this.isLoading = false;
          this.success = true;
          this.mensagemSucesso = "Tipo de anotação salva com sucesso";
          this.tipoAnotacao = response;
          this.mostrarTipoAnotacao();

        }, erro => {
          this.isLoading = false;
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao salvar/editar o tipo de anotação"]
          }
        });
    }
  }

  editarTipoDeAnotacao() {
    this.buscarTipoDeAnotacaoPorId();
    this.mostrarListaAnotacao = 3;
  }

  deletarTipoAnotacao() {

    this.close();
    this.isLoading=true;
    this.anotacaoService.deletarTipoAnotacao(this.tipoAnotacao)
      .subscribe(response => {
        this.isLoading=false;
        this.success = true;
        this.mensagemSucesso = "Tipo de anotação deletada com sucesso";
        this.mostrarTipoAnotacao();
        this.tipoAnotacao = {} as TipoAnotacao;
        this.anotacao.typeAnnotation = this.tipoAnotacao;

      }, erro => {
        this.isLoading=false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao deletar o tipo de anotação"];
        }
      });
  }



}
