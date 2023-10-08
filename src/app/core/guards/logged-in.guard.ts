import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanLoad {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      // Si el usuario ya está logueado, redirigir a la página principal o dashboard
      this.router.navigate(['/']);
      return false; // No permitir acceder a la página de login/registro
    }

    return true; // Permitir acceder a la página de login/registro
  }


  canLoad(): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      // Si el usuario ya está logueado, redirigir a la página principal o dashboard
      this.router.navigate(['/']);
      return false; // No permitir acceder a la página de login/registro
    }

    return true; // Permitir acceder a la página de login/registro
  }
}
