import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { FormularioMascotasComponent } from './pages/formulario-mascotas/formulario-mascotas.component';
import { PetsComponent } from './components/pets/pets.component';
import { GaleriaMascotasComponent } from './pages/galeria-mascotas/galeria-mascotas.component';
import { PreviewMascotasComponent } from './pages/preview-mascotas/preview-mascotas.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ListRazasPageComponent } from './pages/razas/list-razas-page/list-razas-page.component';
import { NewRazaPageComponent } from './pages/razas/new-raza-page/new-raza-page.component';
import { ListEspeciesPageComponent } from './pages/especies/list-especies-page/list-especies-page.component';
import { NewEspeciePageComponent } from './pages/especies/new-especie-page/new-especie-page.component';
import { ListEstadosSaludPageComponent } from './pages/estados-salud/list-estados-salud-page/list-estados-salud-page.component';
import { NewEstadoSaludPageComponent } from './pages/estados-salud/new-estado-salud-page/new-estado-salud-page.component';

const routes: Routes = [
  { path:'',component: PetsComponent,children : [
    { path: '', component: ListaMascotasComponent , canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']}},
    { path: 'new', component: FormularioMascotasComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']}},
    { path: 'galeria', component: GaleriaMascotasComponent },
    { path: 'razas', component: ListRazasPageComponent },
    { path: 'razas/new-raza', component: NewRazaPageComponent },
    { path: 'razas/edit/:id', component: NewRazaPageComponent },
    { path: 'especies', component: ListEspeciesPageComponent },
    { path: 'especies/new-especie', component: NewEspeciePageComponent },
    { path: 'especies/edit/:id', component: NewEspeciePageComponent },
    { path: 'estados-salud', component: ListEstadosSaludPageComponent },
    { path: 'estados-salud/new-estado-salud', component: NewEstadoSaludPageComponent },
    { path: 'estados-salud/edit/:id', component: NewEstadoSaludPageComponent },
    { path: 'preview/:id', component: PreviewMascotasComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']} },
    { path: 'edit/:id', component: FormularioMascotasComponent, canActivate:[AuthGuard],canLoad:[AuthGuard],data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER']} }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
