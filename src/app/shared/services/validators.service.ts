import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private _emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

  get emailPattern(): string {
    return this._emailPattern;
  }

  //Error personalizado

  birthdateValidation(control: FormControl): ValidationErrors | null {
    const valor: Date = new Date(Date.parse(control.value));
    const today: Date = new Date();

    // Establecer las horas, minutos, segundos y milisegundos a 0
    valor.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Comprobar si la fecha es posterior a hoy
    if (valor > today) {
        return { birthdateValidation: true }
    }

    return null;
  }

  samePassword(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(field2)?.setErrors({
          passwordError: true
        })
        return { passwordError: true }
      } else {
        formGroup.get(field2)?.setErrors(null);
        return null;
      }
    }
  }
}

