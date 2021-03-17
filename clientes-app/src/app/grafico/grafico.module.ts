import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraficoRoutingModule } from './grafico.routing';
import { GraficoComponent } from './grafico.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
    declarations: [
        GraficoComponent
    ],
    imports: [
        CommonModule,
        GraficoRoutingModule,
        FormsModule,
        NgxMaskModule.forRoot()
    ],
    exports: [

        GraficoComponent,

    ]
})
export class GraficoModule { }
