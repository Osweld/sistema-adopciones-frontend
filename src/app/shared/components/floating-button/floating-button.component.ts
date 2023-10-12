import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/shared.interface';
import { SharedService } from '../../Servicios/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {
  isLoggedIn:boolean = false;
  getUserRol:string = "";
  getURL:string = "";


  constructor(private sharedService:SharedService, private router:Router) {
    this.isLoggedIn = this.sharedService.isLoggedIn();
    this.getUserRol = this.sharedService.getRol();
    this.getURL = router.url;

   }





  ngOnInit(): void {
  }

}
