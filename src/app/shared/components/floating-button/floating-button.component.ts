import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/shared.interface';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {

  constructor() { }

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
      nombre:"Administra las mascotas",
      url:"/pets",
      icon:"fas fa-camera"
    }
  ]

  ngOnInit(): void {
  }

}
