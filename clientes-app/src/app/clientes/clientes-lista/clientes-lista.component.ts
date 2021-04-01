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
  mensagemErro: String;
  public paginaAtual = 1;
  clientesFilter: Cliente[]
  teste: String[]
  valorPesquisado: String = "";

  constructor(
    private service: ClientesService,
    private router: Router) { }

  ngOnInit() {

    this.service.getClientes()
      .subscribe(response => {
        this.clientes = response;
        this.clientesFilter = response;
        this.filtrar(this.valorPesquisado);
      });
  }


  public novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente(cliente: Cliente) {
    this.service.deletar(this.clienteSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = "Cliente deletado com sucesso"
        this.ngOnInit();
      },
        erro => this.mensagemErro = "Ocorreu erro ao deletar cliente"
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
