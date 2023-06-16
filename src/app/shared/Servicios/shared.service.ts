import { Injectable } from '@angular/core';
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
  constructor() { }
}

export interface SnackbarData {
  color?: string;
  title?: string;
  description?: string;
  isVisible?: boolean;
}
