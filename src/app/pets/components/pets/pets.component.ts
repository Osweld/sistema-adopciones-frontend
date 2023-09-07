import { Component, OnInit } from '@angular/core';
import { Mascota, MascotasPage } from '../../interfaces/pets.interface';
import { PetsService } from '../../service/pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  mascotasPage!: MascotasPage;
  mascotas:Mascota[] = [];

  constructor(private petsService:PetsService) { }

  ngOnInit(): void {

    this.petsService.getAllMarcas(0).subscribe(page =>{
      this.mascotas = page.content
      console.log(this.mascotas)
    })
  }

}
