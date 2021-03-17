import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { Pagamento } from './tiipo/pagamento-tipo.component';
import { PagamentoTipoLista } from './tipo-lista/pagamento-tipo-lista.component';


const routes: Routes = [
  {
    path: 'pagamento', component: LayoutComponent,  canActivate : [AuthGuard], children: [
      { path: 'tipo', component: Pagamento },  
      { path: 'tipo/lista', component: PagamentoTipoLista },
      {path: 'tipo/:id' , component: Pagamento},     
      { path: '',  redirectTo:'/pagamento/tipo/lista', pathMatch:'full' }

    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }

