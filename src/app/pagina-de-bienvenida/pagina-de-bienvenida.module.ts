import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaDeBienvenidaComponent } from './pagina-de-bienvenida.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PaginaDeBienvenidaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PaginaDeBienvenidaComponent }
    ])
  ]
})
export class PaginaDeBienvenidaModule { }
