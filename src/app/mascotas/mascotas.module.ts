import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { FormularioMascotasComponent } from './formulario-mascotas/formulario-mascotas.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListaMascotasComponent },
      { path: 'Crear', component: FormularioMascotasComponent },
      { path: ':id', component: FormularioMascotasComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ListaMascotasComponent,
    FormularioMascotasComponent,
  ],
  imports: [
    CommonModule,
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
    RouterModule.forChild(routes)
  ],
})
export class MascotasModule { }
