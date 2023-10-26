import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Especie, Raza } from 'src/app/pets/interfaces/pets.interface';
import { RazaService } from 'src/app/pets/service/raza.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { switchMap } from 'rxjs';
import { EspecieService } from 'src/app/pets/service/especie.service';

@Component({
  selector: 'app-new-raza-page',
  templateUrl: './new-raza-page.component.html',
  styles: [
  ]
})
export class NewRazaPageComponent implements OnInit {

  razaFormValidationMessage = {
    'nombre': [
      { type: 'required', message: 'El nombre no puede quedar vacio.' },
      { type: 'maxlength', message: 'El nombre no puede sobrepasar los 40 caracteres.' }
    ],
    'especie': [
      { type: 'required', message: 'La especie no puede quedar vacia.' }
    ],
  }

  public especies:Especie[]=[]

  public razaForm = new FormGroup({
    id: new FormControl<number>(0),
    nombre: new FormControl<string>('',{ nonNullable:true }),
    especie: new FormControl<Raza>({id:0,nombre:''},{ nonNullable:true })
  });

  constructor(
    private razaService:RazaService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private sharedService:SharedService,
    private especieService:EspecieService
  ) { }

  ngOnInit(): void {

    //get all especies
    this.especieService.getAllEspecies().subscribe({
      next: especies => this.especies = especies
    })

    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.razaService.getRazaById(id))
    ).subscribe(
      raza => {
        if(!raza) return this.router.navigateByUrl('/pets/razas')

        this.razaForm.reset(raza);
        return;
      }
    );
  }

  /**
   * Getting current raza obj
   */
  get currentRaza():Raza{
    const raza = this.razaForm.value as Raza;

    return raza;
  }

  goBack():void{
    this.router.navigate(['/pets/razas'])
  }


  guardarRaza():void{
    // console.log(this.currentRaza);

    if(!this.razaForm.valid) return;

    if(this.currentRaza.id){
      this.razaService.updateRaza(this.currentRaza).subscribe({
                        next: () => {
                          this.sharedService.mostrarMensaje("green", "Guardado", "Se a guardado exitosamente la raza!!")
                        },
                        error: () =>{
                          this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al actualizar la raza!!")
                        }
                      });
      return;
    }

    this.razaService.addRaza(this.currentRaza).subscribe({
      next: () => {
        this.sharedService.mostrarMensaje("green", "Guardado", "Se a guardado exitosamente la raza!!")
        this.router.navigate(['/pets/razas'])
      },
      error: () =>{
        this.sharedService.mostrarMensaje("red", "Error", "Hubo problemas al actualizar la raza!!")
      }
    });
  }

  saveAndBack(back:boolean):void{
    if(back)
      {
        this.guardarRaza();RazaService
        this.router.navigate(['/pets/razas'])
      }
  }

}
