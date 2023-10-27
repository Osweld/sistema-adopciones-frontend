import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { solicitudAdopcion } from '../../interfaces/pets.interface';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { AdopcionService } from '../../service/adopcion.service';



@Component({
  selector: 'app-solicitud-modal',
  templateUrl: './solicitud-modal.component.html',
  styleUrls: ['./solicitud-modal.component.css']
})
export class SolicitudModalComponent implements OnInit {
  solicitud: FormGroup;
  solicitudData!:solicitudAdopcion;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private adopcionService:AdopcionService,
    public dialogRef: MatDialogRef<SolicitudModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number,nombreMascota:string}
  ) {
    // Crear un formulario con tres campos
    this.solicitud = this.fb.group({
      titulo: ['',[ Validators.required, Validators.minLength(5),Validators.maxLength(150)]],
      descripcion: ['', [Validators.required,Validators.maxLength(500)]]
    });
  }

  solicitudFormValidationMessage = {
    'titulo': [
      { type: 'required', message: 'El titulo no puede quedar vacio.' },
      { type: 'maxlength', message: 'El titulo no puede sobrepasar los 150 caracteres.' },
      { type: 'minLength', message: 'El titulo no puede ser menor a los 5 caracteres.' }
    ],
    'descripcion': [
      { type: 'required', message: 'La descripcion no puede quedar vacia.' },
      {type: 'maxlength', message: 'La descripcion no puede sobrepasar los 500 caracteres.' }
    ]
  }

  ngOnInit(): void {
  }

  submitForm(): void {

    if (this.solicitud.invalid) {
      this.solicitud.markAllAsTouched();
      return;
    }

    this.solicitudData = {
      idMascota: this.data.id,
      titulo: this.solicitud.value.titulo,
      descripcion: this.solicitud.value.descripcion
    }

    this.adopcionService.enviarSolicitud(this.solicitudData).subscribe({
      next: (response) => {
        this.sharedService.mostrarMensaje("green","Solicitud enviada!!","Se a enviado la solicitud, Se respondera a la solicitud lo mas rapido posible!")
        this.dialogRef.close();
      },
      error: (error) => {
        this.sharedService.mostrarMensaje("red","Solicitud No fue enviada!!","Es posible que ya disponga de una solicitud en proceso o que haya ocurrido un error")
      }
    })
   // this.dialogRef.close(this.solicitud.value);
  }

  closeDialog(): void {
    // Cerrar el diálogo sin enviar datos
    this.dialogRef.close();
  }
}
