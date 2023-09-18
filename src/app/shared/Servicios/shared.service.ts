import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private snackbarSubject: BehaviorSubject<SnackbarData | null> = new BehaviorSubject<SnackbarData | null>(
    { color: 'green', title: 'Completado', description: '', isVisible: false }
  );
  public snackbar$ = this.snackbarSubject.asObservable();

  showSnackbar(data: SnackbarData) {
    this.snackbarSubject.next(data);
  }
  constructor() { }
  // Se peude mejorar mas por el momento asi para no hacer que las otras clases
  // que lo implementan generen errorer
  mostrarMensaje(color: string, title: string, descripcion: string): void {

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

}

export interface SnackbarData {
  color?: string;
  title?: string;
  description?: string;
  isVisible?: boolean;
}
