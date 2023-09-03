import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { FormularioMascotasComponent } from './pages/formulario-mascotas/formulario-mascotas.component';
import { PetsComponent } from '../auth/components/auth.component';

const routes: Routes = [
  { path:'',component: PetsComponent,children : [
    { path: '', component: ListaMascotasComponent },
    { path: 'new', component: FormularioMascotasComponent },
    { path: 'edit/:id', component: FormularioMascotasComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
