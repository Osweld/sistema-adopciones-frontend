import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router:Router,
    private tokenService:TokenService,
    private jwtHelper: JwtHelperService
    ){

  }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      // Parseamos el campo "authorities" para obtenerlo como un objeto/array JavaScript
      const authorities = JSON.parse(decodedToken.authorities);

      // Mapeamos el array para obtener solo el valor de "authority" de cada objeto
      const userRoles = authorities.map((auth: any) => auth.authority);
      const routeRoles = route.data && route.data["roles"] as Array<string>;
      // Verificar si alguno de los roles del usuario coincide con los roles permitidos para la ruta
      if (routeRoles.some(role => userRoles.includes(role))) {
        return true;
      }
    }




    // Si el token no es válido o el usuario no tiene los roles adecuados, redirige
    this.router.navigate(['login']);
    return false;
  }
  canLoad(route: Route): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      // Decodificar el token para obtener el payload y los roles
      const decodedToken = this.jwtHelper.decodeToken(token);
      // Parseamos el campo "authorities" para obtenerlo como un objeto/array JavaScript
      const authorities = JSON.parse(decodedToken.authorities);

      // Mapeamos el array para obtener solo el valor de "authority" de cada objeto
      const userRoles = authorities.map((auth: any) => auth.authority);
      console.log(userRoles)
      const routeRoles = route.data && route.data["roles"] as Array<string>;
      console.log(routeRoles)

      // Si la ruta no tiene roles definidos, permitir la carga
      if (!routeRoles) return true;

      // Verificar si alguno de los roles del usuario coincide con los roles permitidos para la ruta
      if (routeRoles.some(role => userRoles.includes(role))) {

        return true;
      }
    }

    // Si el token no es válido o el usuario no tiene los roles adecuados, redirige
    this.router.navigate(['login']);
    return false;
  }

}


