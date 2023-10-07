import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { Login, LoginResponse } from '../../interfaces/session.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!:Login;
  loginResponse!:LoginResponse;

  loginForm:FormGroup = this.fb.group({
    username:["",[Validators.required,Validators.maxLength(15),Validators.minLength(5)]],
    password:["",[Validators.required,Validators.maxLength(20),Validators.minLength(8)]]
  })

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private sharedService:SharedService,
    private router: Router
  ){

  }

  userFormValidationMessage = {
    'username': [
      { type: 'required', message: 'El username no puede quedar vacio.' },
      { type: 'maxlength', message: 'El username no puede sobrepasar los 20 caracteres.' },
      { type: 'minlength', message: 'El username no puede ser menor de los 5 caracteres.' }
    ],
    'password': [
      { type: 'required', message: 'El password no puede quedar vacio.' },
      { type: 'maxlength', message: 'El password no puede sobrepasar los 40 caracteres.' },
      { type: 'minlength', message: 'El password no puede ser menor de los 8 caracteres.' }
    ]
  }


  submitLogin(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authService.login(this.login).subscribe({
      next: response =>{
        this.loginResponse = response;
        localStorage.setItem("token",this.loginResponse.token);
        localStorage.setItem("user",JSON.stringify(this.loginResponse.user));
        this.sharedService.mostrarMensaje("green",`Bienvenido ${this.loginResponse.user.username}`,"El usuario a sido logueado exitosamente")
        this.router.navigate(['/pets/galeria'])
      },
      error: error =>{
        this.sharedService.mostrarMensaje("red","No se a podido iniciar sesion","Contraseña u usuario incorrecto")
      }
    })


  }



  ngOnInit(): void {

  }


}


