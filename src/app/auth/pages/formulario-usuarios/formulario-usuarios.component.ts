import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Usuario } from '../lista-usuarios/lista-usuarios.component';
import { SharedService } from 'src/app/shared/Servicios/shared.service';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css']
})
export class FormularioUsuariosComponent implements OnInit {

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
    private _sharedService: SharedService
  ) {
    this.route.params.subscribe(params => {
      const uuid = params['id'];
      if (uuid) {
        this.idRoute = uuid;
        let DATA: Usuario[] = [];
        const usuariosString = localStorage.getItem('usuarios');
        if (usuariosString !== null) {
          DATA = JSON.parse(usuariosString);
          const usuario = DATA.find(masc => masc.id === this.idRoute);
          if(usuario !== undefined){
          this.razaSeleccionada = this.razasGenerales[usuario.especie.label];
          }
          this.formulario = this._formBuilder.group({
            nombre: [usuario?.nombre, Validators.required],
            fechaNacimiento: [usuario?.fechaNacimiento],
            raza: [usuario?.raza, Validators.required],
            color: [usuario?.color],
            estadoSalud: [usuario?.estadoSalud, Validators.required],
            descripcion: [usuario?.descripcion],
            especie: [usuario?.especie, Validators.required]
          });
        }
      } else {
        this.formulario = this._formBuilder.group({
          nombre: [null, Validators.required],
          fechaNacimiento: [null],
          raza: [null, Validators.required],
          color: [null],
          estadoSalud: [null, Validators.required],
          descripcion: [null],
          especie: [null, Validators.required]
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

  compareFn = (especie1: any, especie2: any) => especie1 && especie2 && especie1.id === especie2.id;


  crearUsuario(): void {
    if (this.formulario.valid) {
      const usuario = { ...this.formulario.value };
      const uuid = uuidv4();
      usuario.id = uuid;
    // Obtener usarios del localStorage
    let usuariosGuardados: any[] = [];
    const usuariosString = localStorage.getItem('usuarios');
    if (usuariosString !== null) {
      usuariosGuardados = JSON.parse(usuariosString);
    }
    // Agregar el nuevo usuario al array
    usuariosGuardados.push(usuario);
    // Guardar el array de usuarios en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
    this.router.navigateByUrl('/listaUsuario');
    // Redireccionar a la lista de usuarios
    this.mostrarMensajeDeExito('Usuario registrado correctamente en el sistema.');
   }
  }

  actualizarUsuario(): void {
    // Obtener la lista de usuarios del localStorage
    const usuariosData = localStorage.getItem('usuarios');
    const usuarios = usuariosData ? JSON.parse(usuariosData) : [];

    // Buscar el empleado a actualizar por su ID
    const usuarioActualizado = usuarios.find((e: any) => e.id === this.idRoute);

    if (usuarioActualizado) {
      // Actualizar los datos del usuario con los datos del formulario
      usuarioActualizado.nombre = this.formulario.get('nombre')?.value;
      usuarioActualizado.fechaNacimiento = this.formulario.get('fechaNacimiento')?.value;
      usuarioActualizado.raza = this.formulario.get('raza')?.value;
      usuarioActualizado.color = this.formulario.get('color')?.value;
      usuarioActualizado.estadoSalud = this.formulario.get('estadoSalud')?.value;
      usuarioActualizado.descripcion = this.formulario.get('descripcion')?.value;
      usuarioActualizado.especie = this.formulario.get('especie')?.value;
      // Guardar la lista actualizada en localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      // Mostrar mensaje de exito
      this.mostrarMensajeDeExito('Cambios aplicados correctamente.');
    }
  }

  guardarUsuario(goBack: boolean): void {
    this.actualizarUsuario();
    if(goBack){
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/listaUsuario');
  }

  mostrarMensajeDeExito(descripcion: string): void {
    this._sharedService.showSnackbar(
      {
        color: 'green',
        title: 'Completado',
        description: descripcion,
        isVisible: true
      }
    );
    setTimeout(() => {
      this._sharedService.showSnackbar(
        {
          isVisible: false
        }
      );
    }, 8000);
  }
}