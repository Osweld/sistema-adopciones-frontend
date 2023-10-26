import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PetsRoutingModule } from './pets-routing.module';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

import {MatMenuModule} from '@angular/material/menu';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent, ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { FormularioMascotasComponent } from './pages/formulario-mascotas/formulario-mascotas.component';
import { PetsComponent } from './components/pets/pets.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { GaleriaMascotasComponent } from './pages/galeria-mascotas/galeria-mascotas.component';
import { PreviewMascotasComponent } from './pages/preview-mascotas/preview-mascotas.component';
import { UploadPhotosComponent } from './components/upload-photos/upload-photos.component';
import { NewEspeciePageComponent } from './pages/especies/new-especie-page/new-especie-page.component';
import { NewEstadoSaludPageComponent } from './pages/estados-salud/new-estado-salud-page/new-estado-salud-page.component';
import { ListEspeciesPageComponent } from './pages/especies/list-especies-page/list-especies-page.component';
import { ListEstadosSaludPageComponent } from './pages/estados-salud/list-estados-salud-page/list-estados-salud-page.component';
import { ListRazasPageComponent } from './pages/razas/list-razas-page/list-razas-page.component';
import { NewRazaPageComponent } from './pages/razas/new-raza-page/new-raza-page.component';


@NgModule({
  declarations: [
    ListaMascotasComponent,
    FormularioMascotasComponent,
    PetsComponent,
    DialogComponent,
    GaleriaMascotasComponent,
    PreviewMascotasComponent,
    NewEspeciePageComponent,
    NewEstadoSaludPageComponent,
    ListEspeciesPageComponent,
    ListEstadosSaludPageComponent,
    UploadPhotosComponent,
    ListRazasPageComponent,
    NewRazaPageComponent
  ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    MatMenuModule
  ]
})
export class PetsModule { }
