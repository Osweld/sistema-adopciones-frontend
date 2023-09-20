import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from '../../service/pets.service';
import { Mascota } from '../../interfaces/pets.interface';


@Component({
  selector: 'app-preview-mascotas',
  templateUrl: './preview-mascotas.component.html',
  styleUrls: ['./preview-mascotas.component.css']
})
export class PreviewMascotasComponent implements OnInit {
  
  mascota: Mascota[] = [];
  id=0;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private PetsService: PetsService
    
  ) { }

  ngOnInit(){
    
    this.activeRoute.params.subscribe(params=>{
      this.id=params['id'];
      this.PetsService.getMascota(this.id)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    })
    /* Guardar datos de la mascota con el "id" a mascota[]
    this.activeRoute.params.subscribe(params=>{
      this.id=params['id'];
      this.PetsService.getMascota(this.id)
    .subscribe(
      res => {
        this.mascota=res;
      },
      err => console.log(err)
    )
    })
    */

  }

}