import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth.guard'
import { RegisterComponent } from './register/register.component';
import { UsuarioComponent } from './usuario/usuario.component';




const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent}, 
  {path:'', component: LayoutComponent , children:[
    {path:'home', component: HomeComponent, canActivate : [AuthGuard]},   
    {path:'usuario', component: UsuarioComponent, canActivate : [AuthGuard] , data :{
      roles:['ROLE_ADMIN'] }},
    {path: '' , redirectTo :'/home', pathMatch: 'full'}
  ]}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
