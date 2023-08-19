import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PaginaDeBienvenidaComponent } from './pages/pagina-de-bienvenida/pagina-de-bienvenida.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    PaginaDeBienvenidaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule

  ]
})
export class HomeModule { }
