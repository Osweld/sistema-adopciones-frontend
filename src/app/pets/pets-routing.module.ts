import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { FormularioMascotasComponent } from './pages/formulario-mascotas/formulario-mascotas.component';
import { PetsComponent } from './components/pets/pets.component';

const routes: Routes = [
  {
    path:'',component: ListaMascotasComponent,

    // path: '',component:PetsComponent,
    // children: [
    //   { path: '', component: ListaMascotasComponent },
    //   { path: 'Crear', component: FormularioMascotasComponent },
    //   { path: ':id', component: FormularioMascotasComponent }
    // ]
  },
  { path: '', component: ListaMascotasComponent },
  { path: ':id', component: FormularioMascotasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
