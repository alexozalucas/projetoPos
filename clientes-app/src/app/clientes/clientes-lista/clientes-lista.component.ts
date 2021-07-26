import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})

export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: String;
  public paginaAtual = 1;
  clientesFilter: Cliente[];
  valorPesquisado: String = "";
  isLoading: boolean = false;
  success: boolean;
  errors: String[];

  constructor(
    private service: ClientesService,
    private router: Router) { }

  ngOnInit() {

    this.isLoading = true;
    this.service.getClientes()
      .subscribe(response => {
        this.clientes = response;
        this.clientesFilter = response;
        this.filtrar(this.valorPesquisado);
        this.isLoading = false;
      }, erro => {
        this.isLoading = false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao carregar os clientes"]
        }
      });
  }

  close() {
    this.errors = [];
    this.success = false;
  }


  public novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente(cliente: Cliente) {
    this.isLoading = true;
    this.close();
    this.service.deletar(this.clienteSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = "Cliente deletado com sucesso"        
        this.isLoading = false;
        this.success = true;
        this.ngOnInit();
      },
        erro => {
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu um erro ao deletar o cliente"]
          }
          this.isLoading = false;
        }
      );
  }

  filtrar(value: String) {
    if (!value) {
      this.clientes = this.clientesFilter;
    } else {
      this.clientes = this.clientesFilter.filter(x => {
        if (x.name.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
          x.cpf.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
          x.dateRegister.trim().toLowerCase().includes(value.trim().toLowerCase())
        ) {
          return true;
        }
      });
    }
    this.valorPesquisado = value;
  }




}
