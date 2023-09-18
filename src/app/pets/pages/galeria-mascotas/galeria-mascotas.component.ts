import { Component, OnInit } from '@angular/core';


import { PetsService } from '../../service/pets.service';


@Component({
  selector: 'app-galeria-mascotas',
  templateUrl: './galeria-mascotas.component.html',
  styleUrls: ['./galeria-mascotas.component.css']
})
export class GaleriaMascotasComponent implements OnInit {

  Mascota: any[] = [];


  constructor(
    private PetsService: PetsService) { }

  ngOnInit(){
    this.PetsService.getPets()
    .subscribe(
      res => {
        this.Mascota = res;
      },
      err => console.log(err)
    )
  }

}
