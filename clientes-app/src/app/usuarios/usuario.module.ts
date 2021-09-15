import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListaComponent } from './usuario-lista.component';


@NgModule({
  declarations: [UsuarioListaComponent],

  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule
  ],
  exports :[
    UsuarioListaComponent,
    
  ]
})
export class UsuarioModule { }
