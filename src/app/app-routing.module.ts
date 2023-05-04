import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaDeBienvenidaComponent } from './pagina-de-bienvenida/pagina-de-bienvenida.component';

const routes: Routes = [
  { path: '', component: PaginaDeBienvenidaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
