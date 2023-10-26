import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecieService } from 'src/app/pets/service/especie.service';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Especie } from 'src/app/pets/interfaces/pets.interface';
import { SharedService } from '../../../../shared/Servicios/shared.service';

@Component({
  selector: 'app-new-especie-page',
  templateUrl: './new-especie-page.component.html',
  styles: [
  ]
})
export class NewEspeciePageComponent implements OnInit {

  especieFormValidationMessage = {
    'nombre': [
      { type: 'required', message: 'El nombre no puede quedar vacio.' },
      { type: 'maxlength', message: 'El nombre no puede sobrepasar los 40 caracteres.' }
    ]
  }

  public especieForm = new FormGroup({
    id: new FormControl<number>(0),
    nombre: new FormControl<string>('',{ nonNullable:true })
  });

  constructor(
    private especieService:EspecieService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.especieService.getEspecieById(id))
    ).subscribe(
      especie => {
        if(!especie) return this.router.navigateByUrl('/')

        this.especieForm.reset(especie);
        return;
      }
    )
  }

  get currentEspecie():Especie{
    const especie = this.especieForm.value as Especie;

    return especie;
  }

  goBack():void{
    this.router.navigate(['/pets/especies'])
  }


  guardarEspecie():void{
    if(!this.especieForm.valid) return;

    if(this.currentEspecie.id){
      this.especieService.updateEspecie(this.currentEspecie).subscribe({
                        next: () => {
                          this.sharedService.mostrarMensaje("green", "Guardado", "Se a guardado exitosamente la especie!!")
                        },
                        error: () =>{
                          this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al actualizar la especie!!")
                        }
                      });
      return;
    }

    this.especieService.addEspecie(this.currentEspecie).subscribe({
      next: () => {
        this.sharedService.mostrarMensaje("green", "Guardado", "Se a guardado exitosamente la especie!!")
        this.router.navigate(['/pets/especies'])
      },
      error: () =>{
        this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al actualizar la especie!!")
      }
    });
  }

  saveAndBack(back:boolean):void{
    if(back)
      {
        this.guardarEspecie();
        this.router.navigate(['/pets/especies'])
      }
  }
}
