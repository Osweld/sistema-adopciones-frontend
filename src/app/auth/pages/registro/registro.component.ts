import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { Genero, User } from '../../interfaces/auth.interface';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/Servicios/shared.service';

import { GeneroService } from '../../services/genero.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../interfaces/session.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user!: User;
  generos: Genero[] = [];
  login!: Login;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService,
    private generoService: GeneroService,
    private validatorService: ValidatorsService
  ) { }

  public ngOnInit(): void {
    this.generoService.getAllGeneros().subscribe(generos => {
      this.generos = generos;
    })
  }

  userForm: FormGroup = this.fb.group({
    nombres: ["", [Validators.required, Validators.maxLength(40)]],
    apellidos: ["", [Validators.required, Validators.maxLength(40)]],
    fechaNacimiento: [, [Validators.required, this.validatorService.birthdateValidation]],
    numeroDui: ["", [Validators.required, Validators.pattern(/^\d{8}-\d{1}$/)]],
    direccion: ["", [Validators.required, Validators.maxLength(150)]],
    email: ["", [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    telefono: ["", [Validators.required, Validators.pattern(/^\d{8}$/)]],
    username: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword: ["", [Validators.required]],
    genero: [, Validators.required],
  }, { validators: this.validatorService.samePassword('password', 'confirmPassword') });

  userFormValidationMessage = {
    'nombres': [
      { type: 'required', message: 'El nombre no puede quedar vacio.' },
      { type: 'maxlength', message: 'El nombre no puede sobrepasar los 40 caracteres.' }
    ],
    'apellidos': [
      { type: 'required', message: 'El apellido no puede quedar vacio.' },
      { type: 'maxlength', message: 'El apellido no puede sobrepasar los 40 caracteres.' }
    ],
    'fechaNacimiento': [
      { type: 'required', message: 'La fecha de nacimiento no puede quedar vacia.' },
      { type: 'birthdateValidation', message: 'La fecha de nacimiento no puede ser en el futuro.' }
    ],
    'numeroDui': [
      { type: 'required', message: 'El DUI no puede quedar vacio.' },
      { type: 'pattern', message: 'Introduzca un formato valido para el DUI (Debe agregar el guion -).' }
    ],
    'direccion': [
      { type: 'required', message: 'La direccion no puede quedar vacia.' }
    ],
    'email': [
      { type: 'required', message: 'El email no puede quedar vacio.' },
      { type: 'pattern', message: 'El formato de email no es valido.' }
    ],
    'telefono': [
      { type: 'required', message: 'El telefono no puede quedar vacio.' },
      { type: 'pattern', message: 'Introduzca un formato valido para el telefono (son 8 digitos).' }
    ],
    'username': [
      { type: 'required', message: 'El username no puede quedar vacio.' },
      { type: 'maxlength', message: 'El username no puede sobrepasar los 15 caracteres.' },
      { type: 'minlength', message: 'El username no puede ser inferior a los 5 caracteres.' }
    ],
    'password': [
      { type: 'required', message: 'El password no puede quedar vacio.' },
      { type: 'maxlength', message: 'El password no puede sobrepasar los 20 caracteres.' },
      { type: 'minlength', message: 'El password no puede ser inferior a los 8 caracteres.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'El password no puede quedar vacio.' },
      { type: 'samePassword', message: 'Los password no coinciden' }
    ],
    'genero': [
      { type: 'required', message: 'El genero no puede quedar vacia.' }
    ]
  }

  crearUsuario(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.fillUser();
    this.authService.register(this.user).subscribe({
      next: user => {
        //aqui vamos a hacer login de un solo y guardamos la variable en localstorage
        this.loginUser();
      },
      error: error => {
        this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al crear el usuario!!")
      }
    })

  }





  fillUser(): void {
    this.user = {
      nombres: this.userForm.value.nombres,
      apellidos: this.userForm.value.apellidos,
      fechaNacimiento: this.userForm.value.fechaNacimiento,
      numeroDui: this.userForm.value.numeroDui,
      direccion: this.userForm.value.direccion,
      email: this.userForm.value.email,
      telefono: this.userForm.value.telefono,
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      genero: { id: this.userForm.value.genero },
      rol: { id: this.userForm.value.rol }

    }
  }

  loginUser() {

    this.login = {
      username: this.userForm.value.username,
      password: this.userForm.value.password
    }

    this.authService.login(this.login).subscribe({
      next: response => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        this.sharedService.mostrarMensaje("green", `Bienvenido ${response.user.username}`, "El usuario a sido creado exitosamente")
        this.router.navigate(['/pets/galeria'])
      },
      error: error => {
        this.sharedService.mostrarMensaje("red", "Error", "Usuario creado pero no se pudo iniciar sesion")
      }

    })
  }
}
