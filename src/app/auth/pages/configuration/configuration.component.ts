import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { AuthService } from '../../services/auth.service';
import { GeneroService } from '../../services/genero.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ChangePassword, Genero, User } from '../../interfaces/auth.interface';
import { Login } from '../../interfaces/session.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  user!: User;
  changePassword!: ChangePassword;
  generos: Genero[] = [];
  login!: Login;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService,
    private generoService: GeneroService,
    private validatorService: ValidatorsService,
    private jwtHelper: JwtHelperService
  ) { }

  public ngOnInit(): void {
    const authToken = localStorage.getItem('token');
    if (authToken && !this.jwtHelper.isTokenExpired(authToken)) {
      const decodedToken = this.jwtHelper.decodeToken(authToken);
      const id = decodedToken.jti;

      this.userService.getUserById(id).subscribe({
        next: user => {
          this.user = user;
          this.fillForm()


        },
        error: error => { }
      })
    }

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
    genero: [, Validators.required],
  });

  changePasswordForm: FormGroup = this.fb.group({
    oldPassword: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword: ["", [Validators.required]],
  })

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

  changePasswordFormValidationMessage = {

    'oldPassword': [
      { type: 'required', message: 'El password no puede quedar vacio.' },
      { type: 'maxlength', message: 'El password no puede sobrepasar los 20 caracteres.' },
      { type: 'minlength', message: 'El password no puede ser inferior a los 8 caracteres.' }
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

  }

  modificarUsuario(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.fillUser();
    this.userService.editUser(this.user.id!, this.user).subscribe({
      next: user => {
        this.sharedService.mostrarMensaje("green", "Modificado", "Se a modificado exitosamente el usuario!!")
        this.router.navigate(['/'])
      },
      error: error => {
        console.log(error)
        this.sharedService.mostrarMensaje("red", "Hubo problemas al modificar el usuario!!", error.error.message)
      }
    })



  }

  sendChangePassword() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    this.changePassword = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.password
    }

    this.userService.changePassword(this.changePassword).subscribe({
      next: password => {
        this.sharedService.mostrarMensaje("green", "Modificado", "Se a modificado exitosamente la contraseña!")
        this.router.navigate(['/'])
      },
      error: error => {
        console.log(error)
        this.sharedService.mostrarMensaje("red", "Hubo problemas al modificar la contraseña!", "Es posible que la contraseña ingreseada no sea la correcta!")
      }
    })


  }





  fillUser(): void {
    this.user = {
      id: this.user.id,
      nombres: this.userForm.value.nombres,
      apellidos: this.userForm.value.apellidos,
      fechaNacimiento: this.userForm.value.fechaNacimiento,
      numeroDui: this.userForm.value.numeroDui,
      direccion: this.userForm.value.direccion,
      username: this.user.username,
      email: this.userForm.value.email,
      telefono: this.userForm.value.telefono,
      genero: { id: this.userForm.value.genero },
      rol: this.user.rol

    }
  }



  fillForm() {
    this.userForm.reset({
      nombres: this.user.nombres,
      apellidos: this.user.apellidos,
      fechaNacimiento: this.user.fechaNacimiento,
      numeroDui: this.user.numeroDui,
      direccion: this.user.direccion,
      email: this.user.email,
      telefono: this.user.telefono,
      genero: this.user.genero.id,
    })
  }


}


