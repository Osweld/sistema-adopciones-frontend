import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { FormularioMascotasComponent } from './pages/formulario-mascotas/formulario-mascotas.component';
import { PetsComponent } from './components/pets/pets.component';
import { GaleriaMascotasComponent } from './pages/galeria-mascotas/galeria-mascotas.component';
import { PreviewMascotasComponent } from './pages/preview-mascotas/preview-mascotas.component';

const routes: Routes = [
  { path:'',component: PetsComponent,children : [
    { path: '', component: ListaMascotasComponent },
    { path: 'new', component: FormularioMascotasComponent },
    { path: 'galeria', component: GaleriaMascotasComponent },
    { path: 'preview', component: PreviewMascotasComponent },
    { path: 'edit/:id', component: FormularioMascotasComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
