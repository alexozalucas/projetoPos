import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, } from '@angular/forms'

import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListaComponent } from './servico-prestado-lista/servico-prestado-lista.component';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { DateUtil } from '../util/Date-Util';
import { NgxPaginationModule } from 'ngx-pagination';
import {DropdownModule} from 'primeng/dropdown';




@NgModule({
  declarations: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListaComponent,


    ],
  imports: [
    CommonModule,    
    ServicoPrestadoRoutingModule,
    FormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    DateUtil,
    NgxPaginationModule,
    DropdownModule,
   
    

  ],
  exports : [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListaComponent
    
   ]
})
export class ServicoPrestadoModule { }
