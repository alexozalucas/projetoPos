import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListaComponent } from './usuario-lista.component';
import {AuthGuard} from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';


const routes: Routes = [
  {path:'usuario' , component:LayoutComponent, canActivate:[AuthGuard], data :{
    roles:['ROLE_ADMIN']
  }, children: [
    { path: 'listar', component: UsuarioListaComponent }, 
    { path: '', redirectTo:'/usuario/lista', pathMatch:'full' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
