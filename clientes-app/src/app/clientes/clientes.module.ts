import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { FormsModule} from '@angular/forms';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component'
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [ClientesFormComponent, ClientesListaComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  exports :[

    ClientesFormComponent,
    ClientesListaComponent
  ]
})
export class ClientesModule { }
