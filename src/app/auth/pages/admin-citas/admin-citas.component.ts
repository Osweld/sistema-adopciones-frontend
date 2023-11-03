import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../interfaces/auth.interface';
import { switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-citas',
  templateUrl: './admin-citas.component.html',
  styleUrls: ['./admin-citas.component.css'],
  providers: [DatePipe] // Añade DatePipe a los providers del componente
})
export class AdminCitasComponent implements OnInit {

  displayedColumnsCita: string[] = ['usuario','mascota','motivo', 'fecha y hora'];
  citaForm: FormGroup;
  citas:Cita[] = [];


  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private citaService:CitaService,
    private datePipe: DatePipe
  ) {

    this.citaForm = this.fb.group({
      fecha: ['', Validators.required],
    });



  }

  citaFormValidationMessage = {
    'fecha': [
      { type: 'required', message: 'La fecha es requerida' },
    ]
  }

  ngOnInit(): void {

    this.citaForm.reset({
      fecha : new Date()
    })

    this.citaService.getCitaByDate(this.citaForm.value.fecha).subscribe({
      next: citas =>{
       this.citas = citas;
      }
    })

    this.citaForm.get('fecha')?.valueChanges.pipe(
      switchMap(fecha =>{
        this.citas = [];
        return this.citaService.getCitaByDate(fecha);
      })
    ).subscribe({
      next: citas => {
        this.citas = citas;
        console.log(this.citas)
      }
    })
  }


  submitForm(){

  }

  getFechaHoraCompleta(fecha: string, hora: string): string {
    const fechaCompleta = new Date(fecha + 'T' + hora);
    return this.datePipe.transform(fechaCompleta, 'fullDate') + ' ' + this.datePipe.transform(fechaCompleta, 'shortTime');
  }

}
