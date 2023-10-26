import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EstadoSalud } from 'src/app/pets/interfaces/pets.interface';
import { EstadoSaludService } from 'src/app/pets/service/estado-salud.service';
import { SharedService } from 'src/app/shared/Servicios/shared.service';

@Component({
  selector: 'app-new-estado-salud-page',
  templateUrl: './new-estado-salud-page.component.html',
  styles: [
  ]
})
export class NewEstadoSaludPageComponent implements OnInit {

  estadoSaludFormValidationMessage = {
    'nombre': [
      { type: 'required', message: 'El nombre no puede quedar vacio.' },
      { type: 'maxlength', message: 'El nombre no puede sobrepasar los 40 caracteres.' }
    ]
  }

  public estadoSaludForm = new FormGroup({
    id: new FormControl<number>(0),
    estado: new FormControl<string>('',{ nonNullable:true })
  });

  constructor(
    private estadoSaludService:EstadoSaludService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.estadoSaludService.getEstadoSaludById(id))
    ).subscribe(
      estadoSalud => {
        if(!estadoSalud) return this.router.navigateByUrl('/pets/estados-salud')

        this.estadoSaludForm.reset(estadoSalud);
        return;
      }
    )
  }

  get currentEstadoSalud():EstadoSalud{
    const estadoSalud = this.estadoSaludForm.value as EstadoSalud;

    return estadoSalud;
  }

  goBack():void{
    this.router.navigate(['/pets/estados-salud'])
  }


  guardarEstadoSalud():void{
    if(!this.estadoSaludForm.valid) return;

    if(this.currentEstadoSalud.id){
      this.estadoSaludService.updateEstadoSalud(this.currentEstadoSalud).subscribe({
                        next: () => {
                          this.sharedService.mostrarMensaje("green", "Guardado", "Se a guardado exitosamente el estado de salud!!")
                        },
                        error: () =>{
                          this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al actualizar el estado de salud!!")
                        }
                      });
      return;
    }

    this.estadoSaludService.addEstadoSalud(this.currentEstadoSalud).subscribe({
      next: () => {
        this.sharedService.mostrarMensaje("green", "Guardado", "Se a guardado exitosamente el estado de salud!!")
        this.router.navigate(['/pets/estados-salud'])
      },
      error: () =>{
        this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al actualizar el estado de salud!!")
      }
    });
  }

  saveAndBack(back:boolean):void{
    if(back)
      {
        this.guardarEstadoSalud();
        this.router.navigate(['/pets/estados-salud'])
      }
  }

}
