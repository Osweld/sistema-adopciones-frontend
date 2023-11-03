import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent, ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { FormularioUsuariosComponent } from './pages/formulario-usuarios/formulario-usuarios.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthComponent } from './components/auth/auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { SolicitudAdopcionComponent } from './pages/solicitud-adopcion/solicitud-adopcion.component';
import { AdminSolicitudComponent } from './pages/admin-solicitud/admin-solicitud.component';
import { VerificarSolicitudComponent } from './components/verificar-solicitud/verificar-solicitud.component';
import { VerDetallesSolicitudComponent } from './components/ver-detalles-solicitud/ver-detalles-solicitud.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';
import { AdminCitasComponent } from './pages/admin-citas/admin-citas.component';
import { AdopcionComponent } from './pages/adopcion/adopcion.component';
import { AdopcionesComponent,DeleteAdopcionComponent } from './pages/adopciones/adopciones.component';



@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    ListaUsuariosComponent,
    FormularioUsuariosComponent,
    AuthComponent,
    DialogComponent,
    DeleteAdopcionComponent,
    ForgotPasswordComponent,
    ConfigurationComponent,
    SolicitudAdopcionComponent,
    AdminSolicitudComponent,
    VerificarSolicitudComponent,
    VerDetallesSolicitudComponent,
    AgendarCitaComponent,
    AdminCitasComponent,
    AdopcionComponent,
    AdopcionesComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    SharedModule
  ]
})
export class AuthModule { }
