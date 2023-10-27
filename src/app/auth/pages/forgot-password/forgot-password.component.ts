import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { Email } from '../../interfaces/email.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent implements OnInit {

  public resetPasswordForm = new FormGroup({
    email: new FormControl<string>('',{ nonNullable:true })
  });

  public resetValidationMessage = {
    'email': [
      { type: 'required', message: 'El email no puede quedar vacio.' },
      { type: 'pattern', message: 'El formato de email no es valido.' }
    ],
  }

  constructor(
    private authService:AuthService,
    private router:Router,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
  }


  get currentEmail():string{
    const email = this.resetPasswordForm.value as Email
    return email.email
  }

  sendEmail():void{
    if(!this.resetPasswordForm.valid) return;
    this.authService.resetPassword(this.currentEmail)
    .subscribe({
      next: result => {
        console.log(result.message);

        this.sharedService.mostrarMensaje("green", "Success", "Contraseña restablecida con éxito, puede verificar en su correo electrónico")
      },
      error: error => {
        console.log(error);

        this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al reestablecer la contraseña!!")
      }
    })
    this.router.navigate(['/login'])
  }

}
