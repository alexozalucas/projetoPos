import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Role } from './roles';
import { Usuario } from './usuario';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})

export class UsuarioListaComponent implements OnInit {


  mensagemSucesso: String;
  public paginaAtual = 1;
  usuariosFilter: Usuario[];
  valorPesquisado: String = "";
  isLoading: boolean = false;
  success: boolean;
  errors: String[];
  usuarios: Usuario[];
  usuario: Usuario;
  roles: Role[];
  roleIdenficado: Role[];


  constructor(
    private service: UserService,
    private router: Router) { }

  ngOnInit() {

    this.isLoading = true;
    this.service.getUserAll()
      .subscribe(response => {
        this.usuarios = response;
        this.usuariosFilter = response;
        this.filtrar(this.valorPesquisado);
        this.isLoading = false;
      }, erro => {
        this.isLoading = false;
        this.errors = erro.error.erros
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao carregar os usuários"]
        }
      });
  }

  close() {
    this.errors = [];
    this.success = false;
  }

  returnRolesDescription(user: Usuario): string{
    var response = "";
     
    user.roles.forEach((x,index) => {
      if(index == 0){
        response = x.name;
      } else {
        response = response + ", "+x.name;
      }
  })
      return response;
  }


  filtrar(value: String) {
    if (!value) {
      this.usuarios = this.usuariosFilter;
    } else {
      this.usuarios = this.usuariosFilter.filter(x => {
        if (x.displayName.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
          x.email.trim().toLowerCase().includes(value.trim().toLowerCase())) {
          return true;
        }
      });
    }
    this.valorPesquisado = value;
  }

  editarUsuario(user: Usuario) {
    
    this.isLoading = true;
    this.close();
    this.service.getRoleAll()
      .subscribe(response => {
        this.roles = response;
        this.usuario = user;
        this.isLoading = false;
        this.usuario.roles.forEach(x =>
          this.roles.filter(v => v.roleId == x.roleId)
            .map(s => { s.check = true }))
      }, erro => {
        this.errors = erro.error.erros
        this.isLoading = false;
        if (this.errors == undefined) {
          this.errors = ["Ocorreu um erro ao carregar a lista de permissões!"]
        }
    });

   

  }

  voltarParaListagem() {
    this.usuario = null;
    this.ngOnInit();
    this.close();
  }

  VerificaStatus(event) {
    this.usuario.enabled = event;
  }

  VerificaStatusRole(event, role: Role) {
    this.roles.filter(x => x.roleId == role.roleId).map(v => v.check = event);
  }

  onSubmit() {

    this.roleIdenficado = [];
    this.roles.filter(x => x.check).forEach(v => {
      this.roleIdenficado.push(v);
    })

    if (this.roleIdenficado.length == 0) {
      this.errors = ["O usuário deve possuir pelo menos uma permissão vinculada!"];
    } else {

      this.isLoading = true;
      this.close();

      this.service.salvar(this.usuario, this.roleIdenficado)
        .subscribe(response => {
          this.success = true;
          this.isLoading = false;
        }, erro => {
          this.errors = erro.error.erros
          if (this.errors == undefined) {
            this.errors = ["Ocorreu erro ao editar usuário!"]
          }
          this.isLoading = false;
        })
    }

  }



}