import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { UserService } from '../../services/user.service';
import { MascotaService } from '../../services/mascota.service';
import { CrearAdopcion, Mascota, User } from '../../interfaces/auth.interface';
import { AdopcionService } from '../../services/adopcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.css']
})
export class AdopcionComponent implements OnInit {

  usuario!:User;
  mascota!:Mascota;
  adopcion!:CrearAdopcion;

  usuarioForm:FormGroup;
  mascotaForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private sharedService: SharedService,
    private userService:UserService,
    private mascotaService:MascotaService,
    private adopcionService:AdopcionService
  ) {
    this.usuarioForm = this.fb.group({
      dui: ["", [Validators.required, Validators.pattern(/^\d{8}-\d{1}$/)]]
    });

    this.mascotaForm = this.fb.group({
      id: ['', Validators.required],
    });

   }

  ngOnInit(): void {
  }


  usuarioFormValidationMessage = {
    'dui': [
      { type: 'required', message: 'El DUI es requerida' },
      { type: 'pattern', message: 'Formato no valido para DUI XXXXXXXX-X' },
    ]
  }

  mascotaFormValidationMessage = {
    'id': [
      { type: 'required', message: 'El id es requerida' }
    ]
  }

  submitUsuarioForm(){
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    this.userService.getUserByDUI(this.usuarioForm.value.dui).subscribe({
      next: usuario =>{
        if(usuario === null){
          this.sharedService.mostrarMensaje("red","Usuario no encontrado","Es posible que hubo un error al ingresar los dato u el usuario no a sido registrado")
          return;
        }
        this.usuario = usuario;
      },
      error: error =>{
        this.sharedService.mostrarMensaje("red","Usuario no encontrado","Es posible que hubo un error al ingresar los dato u el usuario no a sido registrado")
      }
    })
  }

  submitMascotaForm(){
    if (this.mascotaForm.invalid) {
      this.mascotaForm.markAllAsTouched();
      return;
    }

    this.mascotaService.getMascotaById(this.mascotaForm.value.id).subscribe({
      next: mascota => {
        this.mascota = mascota;
      },
      error: error =>{
        this.sharedService.mostrarMensaje("red","Mascota no encontrada","Verifique que el ID sea el correcto")
      }
    })
  }


  guardarAdopcion(){
    if(!this.mascota && !this.usuario){
      this.sharedService.mostrarMensaje("red","No se pudo completar la adopcion","Ingrese un usuario y una mascota")
      return;
    }

    this.adopcion= {
      idUsuario: this.usuario.id!,
      idMascota: this.mascota.id!
    }

    this.adopcionService.saveAdopcion(this.adopcion).subscribe({
      next: adopcion =>{
        this.sharedService.mostrarMensaje("green","Adopcion Realizada Exitosamente!!","Se a podido realizar la adopcion sin problemas")
        this.router.navigate(['/adopciones'])
      },
      error: error =>{
        this.sharedService.mostrarMensaje("red","Ha ocurrido un problema!!","La adopcion NO se a podido realizar exitosamente");
      }
    })


  }



}



