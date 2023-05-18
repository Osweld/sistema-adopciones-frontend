import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Mascota } from '../lista-mascotas/lista-mascotas.component';

@Component({
  selector: 'app-formulario-mascotas',
  templateUrl: './formulario-mascotas.component.html',
  styleUrls: ['./formulario-mascotas.component.css']
})
export class FormularioMascotasComponent implements OnInit {

  formulario!: FormGroup;
  opcionSeleccionada$!: Observable<any>;
  private unsubscribeAll!: Subject<void>;

  razaSeleccionada: { id: number; label: string }[]= [];
  idRoute!: string;
  razasGenerales: any =
    {
      Perro: [
        { id: 1, label: 'Labrador Retriever' },
        { id: 2, label: 'Pastor Alemán' },
        { id: 3, label: 'Golden Retriever' },
        { id: 4, label: 'Bulldog Francés' },
        { id: 5, label: 'Maya' },
        { id: 6, label: 'Otro' }
      ],
      Gato: [
        { id: 1, label: 'Gato doméstico' },
        { id: 2, label: 'Siamese' },
        { id: 3, label: 'Persa' },
        { id: 4, label: 'Maine Coon' },
        { id: 5, label: 'Bengal' },
        { id: 6, label: 'Otro' }

      ],
      Conejo: [
        { id: 1, label: 'Conejo enano holandés' },
        { id: 2, label: 'Conejo mini lop' },
        { id: 3, label: 'Conejo cabeza de león' },
        { id: 4, label: 'Conejo belier' },
        { id: 5, label: 'Conejo mini rex' },
        { id: 6, label: 'Otro' }
      ],
      Hamster: [
        { id: 1, label: 'Hamster Sirio' },
        { id: 2, label: 'Hamster Roborovski' },
        { id: 3, label: 'Hamster Ruso' },
        { id: 4, label: 'Hamster Chino' },
        { id: 5, label: 'Hamster Campbell' },
        { id: 6, label: 'Otro' }
      ],
      Ave: [
        { id: 1, label: 'Periquito común' },
        { id: 2, label: 'Canario ' },
        { id: 3, label: 'Cacatúa ninfa' },
        { id: 4, label: 'Agapornis' },
        { id: 5, label: 'Guacamayo azul' },
        { id: 6, label: 'Otro' }
      ],
      Pez: [
        { id: 1, label: 'Goldfish' },
        { id: 2, label: 'Guppy' },
        { id: 3, label: 'Betta' },
        { id: 4, label: 'Pez ángel' },
        { id: 5, label: 'Tetra neón' },
        { id: 6, label: 'Otro' }
      ]
    };
    estadosDeSalud: string[] = [
      'Sano',
      'Enfermo',
      'Estable',
      'Grave',
      'En tratamiento',
      'Recuperado',
      'Herido',
      'En observación',
      'Rehabilitación',
      'Listo para adopción'
    ]
    especies: any[] = [
      { id: '1', label: 'Perro' },
      { id: '2', label: 'Gato' },
      { id: '3', label: 'Conejo' },
      { id: '4', label: 'Hamster' },
      { id: '5', label: 'Ave' },
      { id: '6', label: 'Pez' }
    ];

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      const uuid = params['id'];
      if (uuid) {
        this.idRoute = uuid;
        let DATA: Mascota[] = [];
        const mascotasString = localStorage.getItem('mascotas');
        if (mascotasString !== null) {
          DATA = JSON.parse(mascotasString);
          const mascota = DATA.find(masc => masc.id === this.idRoute);
          console.log('mascota = ', mascota);

          this.formulario = this._formBuilder.group({
            nombre: [mascota?.nombre, Validators.required],
            fechaNacimiento: [mascota?.fechaNacimiento],
            raza: [mascota?.raza],
            color: [mascota?.color],
            estadoSalud: [mascota?.estadoSalud, Validators.required],
            descripcion: [mascota?.descripcion],
            especie: [mascota?.especie, Validators.required]
          });
        }
      } else {
        this.formulario = this._formBuilder.group({
          nombre: [null, Validators.required],
          fechaNacimiento: [null],
          raza: [{id: '3', label: 'Conejo'}],
          color: [null],
          estadoSalud: [null, Validators.required],
          descripcion: [null],
          especie: [{id: '3', label: 'Conejo'}, Validators.required]
        });
      }
      this.opcionSeleccionada$ = this.formulario.get('especie')?.valueChanges || new Observable<any>();
    });
    this.unsubscribeAll = new Subject<void>();
  }

  ngOnInit(): void {
    this.opcionSeleccionada$.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((especie: { id: number; label: string }) => {
      const raza = especie.label;
      this.razaSeleccionada = this.razasGenerales[raza];
      this.formulario.patchValue({
        raza: null
      });
    });
  }

  crearMascota(): void {
    if (this.formulario.valid) {
      const mascota = { ...this.formulario.value };
      const uuid = uuidv4();
      mascota.id = uuid;
    // Obtener mascotas del localStorage
    let mascotasGuardadas: any[] = [];
    const mascotasString = localStorage.getItem('mascotas');
    if (mascotasString !== null) {
      mascotasGuardadas = JSON.parse(mascotasString);
    }
    // Agregar la nueva mascota al array
    mascotasGuardadas.push(mascota);
    // Guardar el array de mascotas en el localStorage
    localStorage.setItem('mascotas', JSON.stringify(mascotasGuardadas));
    // this.router.navigateByUrl(`/Mascotas/${uuid}`);
    this.router.navigateByUrl(`/Mascotas`);
   }
  }
  guardarMascota(goBack: boolean): void {
    if(goBack){
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/Mascotas');
  }
}
