import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private snackbarSubject: BehaviorSubject<SnackbarData | null> = new BehaviorSubject<SnackbarData | null>(
    {color: 'green', title: 'Completado', description: '', isVisible: false}
  );
  public snackbar$ = this.snackbarSubject.asObservable();

  showSnackbar(data: SnackbarData) {
    this.snackbarSubject.next(data);
  }
  constructor(private jwtHelper: JwtHelperService) { }
// Se peude mejorar mas por el momento asi para no hacer que las otras clases
// que lo implementan generen errorer
  mostrarMensaje(color:string,title:string,descripcion: string): void {
    this.showSnackbar(
      {
        color: color,
        title: title,
        description: descripcion,
        isVisible: true
      }
    );
    setTimeout(() => {
      this.showSnackbar(
        {
          isVisible: false
        }
      );
    }, 8000);
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getRol():string{
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      // Parseamos el campo "authorities" para obtenerlo como un objeto/array JavaScript
      const rol = JSON.parse(decodedToken.authorities)[0]
      const roleValue = rol.authority;
      return roleValue;
    }
    return "";
  }

}

export interface SnackbarData {
  color?: string;
  title?: string;
  description?: string;
  isVisible?: boolean;
}
