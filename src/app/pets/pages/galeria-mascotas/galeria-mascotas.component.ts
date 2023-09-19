import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../service/pets.service';
import { Mascota } from '../../interfaces/pets.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-galeria-mascotas',
  templateUrl: './galeria-mascotas.component.html',
  styleUrls: ['./galeria-mascotas.component.css']
})
export class GaleriaMascotasComponent implements OnInit {

  mascotas: Mascota[] = [];

  constructor(
    private PetsService: PetsService,
    private router: Router)
    { }

  ngOnInit(){
    this.PetsService.getAllMascotasByPagination(0)
    .subscribe(
      mascotasPage => {
        this.mascotas = mascotasPage.content;
        console.log(this.mascotas)
      },
      err => console.log(err)
    )
  }

  

  selectedCard(id: number){
    this.router.navigate(['pets/preview',id])
  }

}
