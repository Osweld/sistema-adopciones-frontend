import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from './core/core.module';
import { JwtModule } from '@auth0/angular-jwt';


export function tokenGetter() {
  const token = localStorage.getItem('token');
  return `${token}`;
}


@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        CoreModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:8080'],
            disallowedRoutes: ['localhost:8080/api/v1/auth']
          }
        })
    ]
})
export class AppModule { }
