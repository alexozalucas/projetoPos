import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { GraficoComponent } from './grafico.component';


const routes: Routes = [
  {path:'graficos' , component: LayoutComponent, canActivate:[AuthGuard], children: [
    {path: 'listar' , component: GraficoComponent},   
    {path: '', redirectTo: '/graficos/listar', pathMatch: 'full'}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoRoutingModule { }
