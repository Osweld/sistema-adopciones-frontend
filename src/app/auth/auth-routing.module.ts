import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { FormularioUsuariosComponent } from './pages/formulario-usuarios/formulario-usuarios.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoggedInGuard } from '../core/guards/logged-in.guard';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { AdminSolicitudComponent } from './pages/admin-solicitud/admin-solicitud.component';
import { SolicitudAdopcionComponent } from './pages/solicitud-adopcion/solicitud-adopcion.component';

export const routes: Routes = [
  { path:'',component: AuthComponent,children: [
    { path: 'login', component: LoginComponent,canActivate:[LoggedInGuard],canLoad:[LoggedInGuard] },
    { path: 'register', component: RegistroComponent,canActivate:[LoggedInGuard],canLoad:[LoggedInGuard]},
    { path: 'listaUsuario', component: ListaUsuariosComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']}},
    { path: 'formUsuario', component: FormularioUsuariosComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']}},
    { path: 'edit/:id', component: FormularioUsuariosComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']}},
    { path: 'configuration', component: ConfigurationComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER','ROLE_USER']}},
    { path: 'admin-solicitud', component: AdminSolicitudComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']}},
    { path: 'solicitudes', component: SolicitudAdopcionComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_USER']}},

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
