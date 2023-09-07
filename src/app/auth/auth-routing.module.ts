import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { FormularioUsuariosComponent } from './pages/formulario-usuarios/formulario-usuarios.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  { path:'',component: AuthComponent,children : [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent },
    { path: 'listaUsuario', component: ListaUsuariosComponent },
    { path: 'formUsuario', component: FormularioUsuariosComponent},
    { path: 'edit/:id', component: FormularioUsuariosComponent}

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
