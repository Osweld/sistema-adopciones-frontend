import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/shared.interface';
import { SharedService } from '../../Servicios/shared.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {
  isLoggedIn:boolean = false;
  getUserRol:string = "";


  constructor(private sharedService:SharedService ) {
    this.isLoggedIn = this.sharedService.isLoggedIn();
    this.getUserRol = this.sharedService.getRol()
   }

  menu:MenuItem[] = [
    {
      nombre:"Ingresa a tú cuenta",
      url:"/login",
      icon:"fas fa-user"
    },
    {
      nombre:"Registrate",
      url:"/register",
      icon:"fas fa-pen"
    },
    {
      nombre:"ListaUsuario",
      url:"/listaUsuario",
      icon:"fas fa-list"
    },
    {
      nombre:"GaleriaMascotas",
      url:"/pets/galeria",
      icon:"fas fa-th"
    },
    {
      nombre:"PreviewMascotas",
      url:"/pets/preview",
      icon:"fas fa-external-link"
    },
    {
      nombre:"Administra las mascotas",
      url:"/pets",
      icon:"fas fa-camera"
    }
  ]

  ngOnInit(): void {
  }

}
