import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { Genero, Rol, User } from '../../interfaces/auth.interface';
import { UserService } from '../../services/user.service';
import { GeneroService } from '../../services/genero.service';
import { RolService } from '../../services/rol.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css']
})
export class FormularioUsuariosComponent implements OnInit {

  user!: User;
  roles: Rol[] = [];
  generos: Genero[] = [];


  userForm: FormGroup = this._formBuilder.group({
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
    rol: [, Validators.required],
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
      { type: 'required', message: 'La direccion no puede quedar vacia.' }
    ],
    'rol': [
      { type: 'required', message: 'La direccion no puede quedar vacia.' }
    ],
  }

  idRoute!: string;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _sharedService: SharedService,
    private userService: UserService,
    private generoService: GeneroService,
    private rolService: RolService,
    private validatorService: ValidatorsService
  ) {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.idRoute = params["id"];
        this.userService.getUserById(parseInt(this.idRoute)).subscribe({
          next: user => {
            this.user = user;
            this.userForm.reset({
              nombres: user.nombres,
              apellidos: user.apellidos,
              fechaNacimiento: user.fechaNacimiento,
              numeroDui: user.numeroDui,
              direccion: user.direccion,
              email: user.email,
              telefono: user.telefono,
              username: user.username,
              genero: user.genero.id,
              rol: user.rol.id
            })
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
          }
        }
        )
      }
    })
  }

  ngOnInit(): void {
    this.generoService.getAllGeneros().subscribe(generos => {
      this.generos = generos;
    })

    this.rolService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    })
  }

  crearUsuario(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.fillUser();
    this.userService.saveUser(this.user).subscribe({
      next: user => {
        this._sharedService.mostrarMensaje("green", "Guardado", "Se a guardado exitosamente el usuario!!")
        console.log(user)
      },
      error: error => {
        this._sharedService.mostrarMensaje("red", "Error", "Hubo problemas al guardar el usuario!!")
      }
    })

  }
  actualizarUsuario(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.fillUser();
    this.userService.editUser(parseInt(this.idRoute),this.user).subscribe({
      next: user => {
        this._sharedService.mostrarMensaje("green", "Modificado", "Se a modificado exitosamente el usuario!!")
        console.log(user)
      },
      error: error => {
        this._sharedService.mostrarMensaje("red", "Error", "No se pudo modificar el usuario!!")
        console.log(error);
        console.log(this.user)
      }
    })
  }

  // cuando se actualice el usuario este se llamara primero
  guardarUsuario(goBack: boolean): void {
    this.actualizarUsuario();
    if (goBack) {
      this.goBack();
    }
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
      genero: {id: this.userForm.value.genero},
      rol: {id:this.userForm.value.rol }

    }
  }


  //no tocarlo...
  goBack(): void {
    this.router.navigateByUrl('/listaUsuario');
  }

}
