import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';



@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string = "";
  message: string = "";
  dataRecebida: string;
  dataInicial: string = "";
  dataFinal: string = "";
  public paginaAtual = 1;
  listaFiltro: ServicoPrestadoBusca[] = [];
  statusAberto: Boolean = true;
  statusFechado: Boolean = true;
  valorPesquisado: string = "";
  servicoPrestadoSelecionado: ServicoPrestadoBusca;
  mensagemSucesso: String;
  isLoading: boolean = false;
  success: boolean;
  errors: String[];

  lista: ServicoPrestadoBusca[] = [];

  constructor(
    private service: ServicoPrestadoService
  ) {

  }


  ngOnInit() {
  }

  consultar() {

    this.close();
    this.isLoading = true;
    if (this.dataInicial.length > 0) {
      this.service.buscarDataNome(this.nome, this.dataInicial, this.dataFinal)
        .subscribe(response => {
          this.isLoading = false;
          this.lista = response;
          this.listaFiltro = response;
          this.filtrar(this.valorPesquisado);

          if (this.listaFiltro.length <= 0) {
            this.message = "Nenhum registro encontrado!";
          } else {
            this.message = null;
          }
        }, erro => {
          this.isLoading = false;
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao buscar as informações"]
          }
        });
    } else {
      this.message = "Informe a competência!";
      this.isLoading = false;
    }
  }

  close() {
    this.errors = [];
    this.success = false;
  }


  montaData(event) {
    var dataRecebida = event.target.value;

    if (dataRecebida.length == 7) {
      var mes = dataRecebida.substring(0, 2);
      var ano = dataRecebida.substring(3);
      var data = new Date(ano, mes, 0);
      var qtdDias = data.getDate();
      this.dataInicial = "01/" + dataRecebida;
      this.dataFinal = qtdDias + "/" + dataRecebida;
    } else {
      this.dataInicial = "";
      this.dataFinal = "";
    }
    this.consultar();

  }

  preparaDelecao(servicePrestado: ServicoPrestadoBusca) {
    this.servicoPrestadoSelecionado = servicePrestado;
  }


  deletarServicoPrestado(servicePrestado: ServicoPrestadoBusca) {

    this.close();
    this.isLoading = true;
    this.service.deletar(this.servicoPrestadoSelecionado)
      .subscribe(response => {
        this.consultar();
        this.success = true;
        this.mensagemSucesso = "serviço prestado deletado com sucesso!"
      }, erro => {
        this.isLoading = false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao deletar serviço prestado!"]
        }
      });
  }


  filtrar(value: string) {

    if (!this.statusAberto && !this.statusFechado) {
      this.lista = []
    } else
      if (!value && this.statusAberto && this.statusFechado) {
        this.lista = this.listaFiltro;
      } else
        if (!value && this.statusFechado && !this.statusAberto) {
          this.lista = this.listaFiltro.filter(x => {
            if (x.releasedPayment) {
              return true;
            }
          });
        } else
          if (!value && this.statusAberto && !this.statusFechado) {
            this.lista = this.listaFiltro.filter(x => {
              if (!x.releasedPayment) {
                return true
              }
            });
          } else
            if (value && (this.statusAberto || this.statusFechado)) {
              this.lista = this.lista.filter(x => {
                if (x.client.name.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
                  x.description.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
                  x.typeService.service.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
                  x.date.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
                  String(x.value).trim().toLowerCase().includes(value.trim().toLowerCase())

                ) {
                  return true;
                }
              });
            } else {
              this.lista = this.listaFiltro.filter(x => {
                if (x.client.name.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
                  x.description.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
                  x.typeService.service.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
                  x.date.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
                  String(x.value).trim().toLowerCase().includes(value.trim().toLowerCase())
                ) {
                  return true;
                }
              });
            }

    this.valorPesquisado = value;
  }


  buscaPorStatus(event, tipo) {

    // status fechado
    if (tipo == 1) {
      this.statusFechado = event
    } else   // status em aberto
      if (tipo == 2) {
        this.statusAberto = event
      }
    this.filtrar(this.valorPesquisado);

  }



}
