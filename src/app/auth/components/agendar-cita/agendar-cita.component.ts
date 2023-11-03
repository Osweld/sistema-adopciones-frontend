import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { SolicitudService } from '../../services/solicitud.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cita, Hora, Solicitud } from '../../interfaces/auth.interface';
import { HoraCitaService } from '../../services/hora-cita.service';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  cita: FormGroup;
  solicitudCita!: Cita;
  horas: Hora[] = [];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private horaCitaService: HoraCitaService,
    private citaService:CitaService,
    public dialogRef: MatDialogRef<AgendarCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { solicitud: Solicitud }
  ) {
    this.cita = this.fb.group({
      motivo: ['', [Validators.required, Validators.maxLength(150)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });

    this.horaCitaService.getHorasCita().subscribe({
      next: horas => {
        this.horas = horas
      }
    })
  }

  citaFormValidationMessage = {
    'motivo': [
      { type: 'required', message: 'El motivo no puede quedar vacio.' },
      { type: 'maxlength', message: 'El motivo no puede sobrepasar los 150 caracteres.' },
    ],
    'fecha': [
      { type: 'required', message: 'La fecha es requerida' },
    ],
    'hora': [
      { type: 'required', message: 'La hora es requerida' },
    ]
  }

  ngOnInit(): void {
  }

  submitForm(): void {

    if (this.cita.invalid) {
      this.cita.markAllAsTouched();
      return;
    }

    this.solicitudCita = {
      fechaCita: this.cita.value.fecha,
      motivoCita: this.cita.value.motivo,
      solicitudAdopcion: this.data.solicitud,
      horaCitaSolicitud: { id: this.cita.value.hora }
    }

    this.citaService.createCita(this.solicitudCita).subscribe({
      next: solicitud =>{
        this.sharedService.mostrarMensaje("green","Solicitud procesada!!","La cita fue procesada correctamente")
        this.dialogRef.close();
        window.location.reload();

      },
        error: (error) => {
          this.sharedService.mostrarMensaje("red","Cita No pudo ser procesada!!","Es posible que esa fecha y hora, ya fueran seleccionadas, por favor seleccione otra fecha u otra hora")
        }
    })
  }

  closeDialog(): void {
    // Cerrar el diálogo sin enviar datos
    this.dialogRef.close();
  }

}
