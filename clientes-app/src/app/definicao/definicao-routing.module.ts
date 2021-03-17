import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { TipoServicoListaComponent } from './tipo-lista/definicao-tipo-lista.component';
import { DefinicaoTipoServico } from './tipo/definicao-tipo-servico.component';

const routes: Routes = [
  {
    path: 'definicao', component: LayoutComponent,  canActivate : [AuthGuard], children: [
      { path: 'tipo', component: DefinicaoTipoServico },  
      { path: 'tipo/lista', component: TipoServicoListaComponent },
      {path: 'tipo/:id' , component: DefinicaoTipoServico},     
      { path: '',  redirectTo:'/definicao/tipo/lista', pathMatch:'full' }

    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinicaoRoutingModule { }

