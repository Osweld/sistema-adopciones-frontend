import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-mascotas',
  templateUrl: './formulario-mascotas.component.html',
  styleUrls: ['./formulario-mascotas.component.css']
})
export class FormularioMascotasComponent implements OnInit {

  razas: any[] = [];
  especies: any[] = [];
  formulario: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formulario = this._formBuilder.group({
      nombre: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      idRaza: [null, Validators.required],
      color: [null],
      estadoSalud: [null, Validators.required],
      descripcion: [null],
      idEspecie: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

}
