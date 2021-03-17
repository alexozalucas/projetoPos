import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { PrestacaoContasRoutingModule } from './prestacao-routing.module';
import { PrestacaoContasListaComponent } from './contas-lista/prestacao-contas-lista.component';
import { PrestacaoContasComponent } from './contas/prestacao-contas.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

@NgModule({
  declarations: [
    PrestacaoContasListaComponent ,
    PrestacaoContasComponent
    
    ],
  imports: [
    CommonModule,        
    FormsModule,
    RouterModule,
    PrestacaoContasRoutingModule,
    NgxMaskModule.forRoot()
  ],
  exports : [
    PrestacaoContasListaComponent,
    PrestacaoContasComponent        
   ]
})
export class PrestacaoContasModule { }
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
 
