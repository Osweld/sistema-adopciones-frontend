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


  idRoute!: string;

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
          /*if(usuario !== undefined){
          this.razaSeleccionada = this.razasGenerales[usuario.especie.label];
          }*/
          this.formulario = this._formBuilder.group({
            nombre: [usuario?.nombre, Validators.required],
            //fechaNacimiento: [usuario?.fechaNacimiento],
            //raza: [usuario?.raza, Validators.required],
            alias: [usuario?.alias],
            clave: [usuario?.clave, Validators.required],
            //descripcion: [usuario?.descripcion],
            email: [usuario?.email, Validators.required]
          });
        }
      } else {
        this.formulario = this._formBuilder.group({
          nombre: [null, Validators.required],
          //fechaNacimiento: [null],
          //raza: [null, Validators.required],
          alias: [null, Validators.required],
          clave: [null, Validators.required],
          //descripcion: [null],
          email: [null, Validators.required]
        });
      }
      this.opcionSeleccionada$ = this.formulario.get('email')?.valueChanges || new Observable<any>();
    });
    this.unsubscribeAll = new Subject<void>();
   }

  ngOnInit(): void {
    this.opcionSeleccionada$.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((email: { id: number; label: string }) => {
      /*const raza = especie.label;
      this.razaSeleccionada = this.razasGenerales[raza];
      this.formulario.patchValue({
        raza: null
      });*/
    });
  }

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
      //usuarioActualizado.fechaNacimiento = this.formulario.get('fechaNacimiento')?.value;
      //usuarioActualizado.raza = this.formulario.get('raza')?.value;
      usuarioActualizado.alias = this.formulario.get('alias')?.value;
      usuarioActualizado.clave = this.formulario.get('clave')?.value;
      //usuarioActualizado.descripcion = this.formulario.get('descripcion')?.value;
      usuarioActualizado.email = this.formulario.get('email')?.value;
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