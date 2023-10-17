import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SessionButtonsComponent } from './components/session-buttons/session-buttons.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    FloatingButtonComponent,
    CustomSnackBarComponent,
    FooterComponent,
    SessionButtonsComponent,
    LogoutComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    MatIconModule
  ],
  exports: [
    FloatingButtonComponent,
    CustomSnackBarComponent,
    FooterComponent,
    SessionButtonsComponent,
    LogoutComponent,
    PaginationComponent

  ]

})
export class SharedModule { }
