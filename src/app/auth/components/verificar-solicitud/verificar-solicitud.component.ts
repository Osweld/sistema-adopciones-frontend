import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { SolicitudService } from '../../services/solicitud.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Solicitud, VerificarSolicitudDatos } from '../../interfaces/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-solicitud',
  templateUrl: './verificar-solicitud.component.html',
  styleUrls: ['./verificar-solicitud.component.css']
})
export class VerificarSolicitudComponent implements OnInit {

  solicitud: FormGroup;
  datosSolicitud!:VerificarSolicitudDatos;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private solicitudService:SolicitudService,
    public dialogRef: MatDialogRef<VerificarSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {solicitud:Solicitud},
    private router:Router
  ) {
    this.solicitud = this.fb.group({
      comentarios: ['', [Validators.required,Validators.maxLength(200)]],
      estado:['',Validators.required]
    });
  }

  solicitudFormValidationMessage = {
    'comentarios': [
      { type: 'required', message: 'El comentario no puede quedar vacio.' },
      {type: 'maxlength', message: 'El comentario no puede sobrepasar los 200 caracteres.' },
      ],
      'estado': [
        { type: 'required', message: 'El estado no puede quedar vacio.' },
      ]
  }





  ngOnInit(): void {
  }

  submitForm(): void {

    if (this.solicitud.invalid) {
      this.solicitud.markAllAsTouched();
      return;
    }

    this.datosSolicitud = {
    idSolicitud:this.data.solicitud.id,
    idEstadoSolicitud: this.solicitud.value.estado,
    comentarios: this.solicitud.value.comentarios
    }

    this.solicitudService.verificarSolicitud(this.datosSolicitud).subscribe({
      next: solicitud =>{
        this.sharedService.mostrarMensaje("green","Solicitud procesada!!","La solicitud fue procesada y fue enviada al usuario")
        this.dialogRef.close();
        window.location.reload();

      },
        error: (error) => {
          this.sharedService.mostrarMensaje("red","Solicitud No pudo ser procesada!!","Ha ocurrido un error al procesar la solicitud")
        }
    })
  }

  closeDialog(): void {
    // Cerrar el diálogo sin enviar datos
    this.dialogRef.close();
  }

}
