import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ingreso!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.ingreso= this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      usuario:[],
      password:[]
    });
  }

  public submitFormulario(){
    alert("Se va a enviar el formulario");
    console.log(this.ingreso.value);
    
  }

}


