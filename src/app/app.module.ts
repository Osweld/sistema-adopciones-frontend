import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { PaginaDeBienvenidaComponent } from './pagina-de-bienvenida/pagina-de-bienvenida.component';

const routes: Routes = [
  { path: '', redirectTo: 'Bienvenido', pathMatch: 'full'},
  { path: 'Bienvenido', component: PaginaDeBienvenidaComponent },
  { path: 'Mascotas', loadChildren: () => import('./mascotas/mascotas.module').then(m => m.MascotasModule) }
];

@NgModule({
  declarations: [
    AppComponent,
    PaginaDeBienvenidaComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
