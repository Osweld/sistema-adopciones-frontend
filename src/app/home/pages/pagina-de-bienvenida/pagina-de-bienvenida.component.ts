import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { environment } from 'src/environments/environment';

interface Estadisticas {
  estado:   string;
  cantidad: number;
}

@Component({
  selector: 'app-pagina-de-bienvenida',
  templateUrl: './pagina-de-bienvenida.component.html',
  styleUrls: ['./pagina-de-bienvenida.component.css']
})
export class PaginaDeBienvenidaComponent implements OnInit {

  oneTimeSubscription: boolean = true;
  chosenAmount?: number;
  disponibles!:number;
  adoptados!:number;
  fallecidos!:number;
  isLoggedIn:boolean = false;
  url:string = environment.baseUrl+"/api/v1/mascotas/estadisticas"

  estadisticas:Estadisticas[] = [];

  constructor(
    private elementRef: ElementRef,
    private _formBuilder: FormBuilder,
    private sharedService:SharedService,
    private http:HttpClient
  ) {

    this.isLoggedIn = sharedService.isLoggedIn();
  }

  public ngOnInit(): void {

    this.http.get<Estadisticas[]>(this.url).subscribe({
      next: estadisticas =>{
        estadisticas.forEach( estadistica =>{
          if(estadistica.estado === 'DISPONIBLE'){
            this.disponibles = estadistica.cantidad;
          }
          if(estadistica.estado === 'ADOPTADO'){
            this.adoptados = estadistica.cantidad;
          }
          if(estadistica.estado === 'FALLECIDO'){
            this.fallecidos = estadistica.cantidad;
          }
        })
      }
    })



    // Navbar shrink function
    const navbarShrink = () => {
      const navbarCollapsible = document.body.querySelector('#mainNav') as HTMLElement;
      if (!navbarCollapsible) {
        return;
      }
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink')
      } else {
        navbarCollapsible.classList.add('navbar-shrink')
      }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        rootMargin: '0px 0px -40%',
      });
    };

    // collapsee responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler') as HTMLElement;
    const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem: HTMLElement) {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: [null],
  });

  changeSubscription(type: string): void {
    if(type === 'oneTimeSubscription'){
      this.oneTimeSubscription = true;
    } else {
      this.oneTimeSubscription = false;
    }
  }

  selectAmount(amount: number): void {
    switch (amount) {
      case 5:
        this.chosenAmount = 5;
        break;
      case 10:
        this.chosenAmount = 10;
        break;
      case 20:
        this.chosenAmount = 20;
        break;
      case 30:
        this.chosenAmount = 30;
        break;
      default:
        this.chosenAmount = amount;
        break;
    }
  }
}
