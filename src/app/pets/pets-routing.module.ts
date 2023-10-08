import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { FormularioMascotasComponent } from './pages/formulario-mascotas/formulario-mascotas.component';
import { PetsComponent } from './components/pets/pets.component';
import { GaleriaMascotasComponent } from './pages/galeria-mascotas/galeria-mascotas.component';
import { PreviewMascotasComponent } from './pages/preview-mascotas/preview-mascotas.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path:'',component: PetsComponent,children : [
    { path: '', component: ListaMascotasComponent , canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']}},
    { path: 'new', component: FormularioMascotasComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']}},
    { path: 'galeria', component: GaleriaMascotasComponent },
    { path: 'preview/:id', component: PreviewMascotasComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']} },
    { path: 'edit/:id', component: FormularioMascotasComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']} }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
