import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { PrestacaoContasListaComponent } from './contas-lista/prestacao-contas-lista.component';
import { PrestacaoContasComponent } from './contas/prestacao-contas.component';


const routes: Routes = [
  {
    path: 'prestacao', component: LayoutComponent,  canActivate : [AuthGuard], children: [
      { path: 'conta', component: PrestacaoContasComponent },  
      { path: 'conta/lista', component: PrestacaoContasListaComponent },      
      {path: 'conta/:id' , component: PrestacaoContasComponent},           
      {path: 'conta/:id/:relatorio' , component: PrestacaoContasComponent},    
      { path: '', redirectTo:'/prestacao/conta/lista', pathMatch:'full' }

    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestacaoContasRoutingModule { }

