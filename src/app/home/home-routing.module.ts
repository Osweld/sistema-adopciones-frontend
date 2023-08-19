import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaDeBienvenidaComponent } from './pages/pagina-de-bienvenida/pagina-de-bienvenida.component';

const routes: Routes = [
  {path:'',component:PaginaDeBienvenidaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
