import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../service/pets.service';
import { Foto, Mascota } from '../../interfaces/pets.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-galeria-mascotas',
  templateUrl: './galeria-mascotas.component.html',
  styleUrls: ['./galeria-mascotas.component.css']
})
export class GaleriaMascotasComponent implements OnInit {

  mascotas: Mascota[] = [];
  fotos: Foto[] = [];
  uploadedImages: any[] = [];
  i=1;

  constructor(
    private PetsService: PetsService,
    private router: Router)
    { }

  ngOnInit(){
    this.PetsService.getAllMascotasPage(0)
    .subscribe(
      mascotasPage => {
        this.mascotas = mascotasPage.content;
        console.log(this.mascotas)
        this.mascotas.forEach(element => {
          console.log("prueba",element.id)
          this.PetsService.getFotosByMascotaId(element.id!).subscribe({
            next : fotos => {
              if (fotos && fotos.length > 0) {
                this.fotos = fotos;
                console.log("pruebaFoto",this.fotos)
                this.fotos.forEach(foto => this.uploadedImages.push(foto));
              }
            }
          })
        });
      },
      err => console.log(err)
    )

/*
      this.mascotas.forEach(element => {
        this.PetsService.getFotosByMascotaId(element.id!).subscribe({
          next : fotos => {
            if (fotos && fotos.length > 0) {
              this.fotos = fotos;
              this.fotos.forEach(foto => this.uploadedImages.push(foto.link));
            }
          }
        })
      });
*/
    console.log("hola",this.uploadedImages)

  }

  selectedCard(id: number){
    this.router.navigate(['pets/preview',id])
  }

  valorI(id: number){
    this.i=id
  }

  filtrarFotosPorId(id: number): Foto[]{
    console.warn("valor de i = ",id)
    return this.uploadedImages.filter(foto => foto.mascota.id == id);
  }

}
