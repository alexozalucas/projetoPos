import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { DefinicaoTipoServico } from './tipo/definicao-tipo-servico.component';
import { DefinicaoRoutingModule } from './definicao-routing.module';
import { TipoServicoListaComponent } from './tipo-lista/definicao-tipo-lista.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    DefinicaoTipoServico,   
    TipoServicoListaComponent
    
    ],
  imports: [
    CommonModule,        
    FormsModule,
    RouterModule,
    DefinicaoRoutingModule,
    NgxPaginationModule
  ],
  exports : [
    DefinicaoTipoServico,
    TipoServicoListaComponent
        
   ]
})
export class DefinicaoModule { }
