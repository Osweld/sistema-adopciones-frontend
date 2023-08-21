import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'pets', loadChildren: () => import('./pets/pets.module').then(m => m.PetsModule) },
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
