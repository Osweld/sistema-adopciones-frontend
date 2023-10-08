import { Component, OnInit } from '@angular/core';
import { Mascota, MascotasPage } from '../../interfaces/pets.interface';
import { PetsService } from '../../service/pets.service';
import { SharedService } from 'src/app/shared/Servicios/shared.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  mascotasPage!: MascotasPage;
  mascotas:Mascota[] = [];
  isLoggedIn:boolean = false;

  constructor(
    private petsService:PetsService,
    private sharedService:SharedService) {
      this.isLoggedIn = this.sharedService.isLoggedIn();
    }

  ngOnInit(): void {
  }

}
