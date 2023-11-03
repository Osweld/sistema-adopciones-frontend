import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { Especie, Estado, EstadoSalud, Mascota, Raza } from '../../interfaces/pets.interface';
import { Genero } from 'src/app/auth/interfaces/auth.interface';
import { PetsService } from '../../service/pets.service';
import { GeneroService } from '../../service/genero.service';
import { RazaService } from '../../service/raza.service';
import { EspecieService } from '../../service/especie.service';
import { EstadoSaludService } from '../../service/estado-salud.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EstadoMascotaService } from '../../service/estado-mascota.service';

@Component({
  selector: 'app-formulario-mascotas',
  templateUrl: './formulario-mascotas.component.html',
  styleUrls: ['./formulario-mascotas.component.css']
})
export class FormularioMascotasComponent implements OnInit {

  mascota!: Mascota;
  generos: Genero[] = [];
  razas: Raza[] = [];
  estados:Estado[] = [];
  estadoSalud: EstadoSalud[] = [];
  especies: Especie[] = [];
  idRoute!: string;


  mascotaForm:FormGroup = this.fb.group({
    nombre: ["", [Validators.required, Validators.maxLength(40)]],
    fechaNacimiento: [, [Validators.required, this.validatorService.birthdateValidation]],
    color: ["", [Validators.required, Validators.maxLength(60)]],
    descripcion: ["", [Validators.maxLength(250)]],
    genero: [, Validators.required],
    raza: [, Validators.required],
    estadoSalud: [, Validators.required],
    especie: [, Validators.required],
    estado: ["1",Validators.required]

  })

  mascotaFormValidationMessage = {
    'nombre': [
      { type: 'required', message: 'El nombre no puede quedar vacio.' },
      { type: 'maxlength', message: 'El nombre no puede sobrepasar los 40 caracteres.' }
    ],
    'fechaNacimiento': [
      { type: 'required', message: 'La fecha de nacimiento no puede quedar vacia.' },
      { type: 'birthdateValidation', message: 'La fecha de nacimiento no puede ser en el futuro.' }
    ],
    'color': [
      { type: 'required', message: 'El color de la mascota no puede quedar vacio.' },
      { type: 'maxlength', message: 'El color no puede sobrepasar los 60 caracteres.' }
    ],
    'descripcion': [
      { type: 'maxlength', message: 'La descripcion no puede sobrepasar los 250 caracteres.' }
    ],
    'genero': [
      { type: 'required', message: 'El genero no puede quedar vacio.' }
    ],
    'estadoSalud': [
      { type: 'required', message: 'El estado de salud no puede quedar vacio.' }
    ],
    'especie': [
      { type: 'required', message: 'La especie no puede quedar vacia.' }
    ],
    'raza': [
      { type: 'required', message: 'La raza no puede quedar vacia.' }
    ],
    'estado': [
      { type: 'required', message: 'El estado no puede quedar vacia.' }
    ]
  }

  constructor(
    private petService: PetsService,
    private generoService: GeneroService,
    private razaService: RazaService,
    private estadoSaludService: EstadoSaludService,
    private especieService: EspecieService,
    private estadoMascotaService:EstadoMascotaService,
    private fb:FormBuilder,
    private validatorService: ValidatorsService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService:SharedService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.idRoute = params["id"];
        this.petService.getMascotaById(parseInt(this.idRoute)).subscribe({
          next: mascota => {
            this.mascota = mascota;
            this.cdr.markForCheck();
            this.mascotaForm.reset({
              nombre: mascota.nombre,
              color: mascota.color,
              fechaNacimiento: mascota.fechaNacimiento,
              descripcion: mascota.descripcion,
              genero: mascota.genero.id,
              estadoSalud: mascota.estadoSalud.id,
              especie: mascota.especie.id,
              raza: mascota.raza.id,
              estado:mascota.estadoMascota.id
            })
          }
        }
        )
      }
    })
   }



  ngOnInit(): void {
    this.generoService.getAllGeneros().subscribe({
      next: generos => this.generos = generos
    })

    this.especieService.getAllEspecies().subscribe({
      next: especies => this.especies = especies
    })

    this.estadoMascotaService.getAllestadoMascota().subscribe({
      next: estados => {
        this.estados = estados
      }
    })

    this.estadoSaludService.getAllEstadoSalud().subscribe({
      next: estadoSalud => this.estadoSalud = estadoSalud
    })

    this.mascotaForm.get('especie')?.valueChanges.pipe(
      switchMap(especieId => {
        this.razas = [];
        return this.razaService.getAllRazaByEspecieId(especieId);
      })
    ).subscribe(razas => {
      this.razas = razas;
    },error =>{
    });

  }


  crearUsuario(): void {
    if (this.mascotaForm.invalid) {
      this.mascotaForm.markAllAsTouched();
      return;
    }

    this.fillMascota();
    this.petService.saveMascota(this.mascota).subscribe({
      next: mascota => {
        this.sharedService.mostrarMensaje("green", "Guardado", "Se a guardado exitosamente la mascota!!")
        this.router.navigate(['/pets'])
      },
      error: error => {
        this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al guardar la mascota!!")
      }
    })

  }
  actualizarUsuario(): void {
    if (this.mascotaForm.invalid) {
      this.mascotaForm.markAllAsTouched();
      return;
    }

    this.fillMascota();
    this.petService.editMascota(parseInt(this.idRoute),this.mascota).subscribe({
      next: mascota => {
        this.sharedService.mostrarMensaje("green", "Modificado", "Se a modificado exitosamente la mascota!!")
        this.router.navigate(['/pets'])

      },
      error: error => {
        this.sharedService.mostrarMensaje("red", "Error", "No se pudo modificar la mascota!!")
      }
    })
  }


  guardarUsuario(goBack: boolean): void {
    this.actualizarUsuario();
    if (goBack) {
      this.goBack();
    }
  }


  fillMascota(): void {
    this.mascota = {
      nombre : this.mascotaForm.value.nombre,
      color : this.mascotaForm.value.color,
      descripcion: this.mascotaForm.value.descripcion,
      fechaNacimiento: this.mascotaForm.value.fechaNacimiento,
      genero : { id : this.mascotaForm.value.genero},
      estadoSalud : { id : this.mascotaForm.value.estadoSalud},
      especie : { id : this.mascotaForm.value.especie},
      raza : { id : this.mascotaForm.value.raza},
      estadoMascota : { id : this.mascotaForm.value.estado}
    }


  }


  //no tocarlo...
  goBack(): void {
    this.router.navigateByUrl('/pets');
  }

}

