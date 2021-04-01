import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { FormsModule} from '@angular/forms';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component'
import { NgxMaskModule } from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';





@NgModule({
  declarations: [ClientesFormComponent, ClientesListaComponent],

  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule

   
 
     
  ],
  exports :[

    ClientesFormComponent,
    ClientesListaComponent
  ]
})
export class ClientesModule { }
