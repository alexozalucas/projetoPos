import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { ClientesModule } from './clientes/clientes.module';
import { ClientesService } from './clientes.service'
import { HttpClientModule } from '@angular/common/http';
import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';
import { ServicoPrestadoService } from './servico-prestado.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { authInterceptorProviders } from './token.interceptor';
import { RegisterComponent } from './register/register.component';
import { DefinicaoModule } from './definicao/definicao.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { PagamentoService } from './pagamento.services';
import { DefinicaoService } from './definicao.service';
import { PrestaContasService } from './presta-contas.services';
import { PrestacaoContasModule } from './prestacao/prestacao-contas.module';
import { GraficoModule } from './grafico/grafico.module';
import { GraficoService } from './grafico-services';
import { DateUtil } from './util/Date-Util';
import { UsuarioComponent } from './usuario/usuario.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthServices } from './services/auth.services';
import { AgendaService } from './agenda.service';
import { AnotacaoService } from './anotacao.service';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
    RegisterComponent,
    UsuarioComponent
  ],

  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    ServicoPrestadoModule,
    DefinicaoModule,
    PagamentoModule,
    PrestacaoContasModule,
    GraficoModule,
    DateUtil,
    NgxMaskModule,
    NgxPaginationModule,    


  ],
  providers: [ClientesService,
    DefinicaoService,
    ServicoPrestadoService,
    PagamentoService,
    PrestaContasService,
    AuthServices,
    authInterceptorProviders,
    GraficoService,
    AgendaService,
    AnotacaoService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
