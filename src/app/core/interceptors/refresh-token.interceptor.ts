import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  baseUrl: string = environment.baseUrl + "/api/v1"

  excludedRoutes: string[] = [
    `${this.baseUrl}/auth/token/refresh`,
    `${this.baseUrl}/auth/login`,
    `${this.baseUrl}/auth/register`,
    `${this.baseUrl}/generos`,
    `${this.baseUrl}/mascotas/`,
    `${this.baseUrl}/mascotas`,
    `${this.baseUrl}/razas/`,
    `${this.baseUrl}/especies/`,
    `${this.baseUrl}/roles`,
    // ... otras rutas que quieres excluir
  ];

  constructor(private jwtHelper: JwtHelperService, private router: Router, private tokenService: TokenService) { }



//no actualiza el token

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');
    if (this.isExcludedRequest(request.url)) {
      return next.handle(request);
    }

    if (!authToken || this.jwtHelper.isTokenExpired(authToken)) {
      localStorage.clear()
      this.router.navigate(['/login']);
      return throwError('Token no disponible o expirado');
    }


    return this.tokenService.refreshToken().pipe(
      switchMap(resp => {
        localStorage.setItem("token", resp.token);

        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${resp.token}`
          }
        });
        return next.handle(clonedRequest);
      }),
      catchError(error => {
        localStorage.clear();
        this.router.navigate(['/login']);
        return throwError('Error refrescando el token');
      })
    );
  }

  private isExcludedRequest(url: string): boolean {
    return this.excludedRoutes.some(route => url.includes(route));
  }

}
