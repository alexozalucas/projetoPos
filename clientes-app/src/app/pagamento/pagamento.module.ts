import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { PagamentoTipoLista } from './tipo-lista/pagamento-tipo-lista.component';
import { Pagamento } from './tiipo/pagamento-tipo.component';
import { PagamentoRoutingModule} from './pagamento-routing,module'


@NgModule({
    declarations: [
        PagamentoTipoLista,
        Pagamento      
      ],
    imports: [
      CommonModule,        
      FormsModule,
      RouterModule,
      PagamentoRoutingModule,
    ],
    exports : [
        PagamentoTipoLista,
        Pagamento
          
     ]
  })
  export class PagamentoModule { }