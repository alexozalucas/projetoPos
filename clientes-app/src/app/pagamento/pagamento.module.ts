import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { PagamentoTipoLista } from './tipo-lista/pagamento-tipo-lista.component';
import { Pagamento } from './tiipo/pagamento-tipo.component';
import { PagamentoRoutingModule} from './pagamento-routing,module'
import {NgxPaginationModule} from 'ngx-pagination';


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
      NgxPaginationModule
    ],
    exports : [
        PagamentoTipoLista,
        Pagamento
          
     ]
  })
  export class PagamentoModule { }