import { Component, OnInit } from '@angular/core';

export interface Catalog {
  id: number;
  label: string;
}

export interface Mascota {
  id?: string;
  fechaNacimiento?: Date;
  color?: string;
  descripcion?: string;
  nombre: string;
  especie: Catalog;
  raza: Catalog;
  estadoSalud: string;
}

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'especie', 'raza', 'estadoSalud'];
  dataSource: any;

  constructor() {
    let DATA: Mascota[] = [];
    const mascotasString = localStorage.getItem('mascotas');
    if (mascotasString !== null) {
      DATA = JSON.parse(mascotasString);
      this.dataSource = DATA;
    }
  }

  ngOnInit(): void {
  }

}
