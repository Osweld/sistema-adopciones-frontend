import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ingreso!: FormGroup;
  public ingresar: boolean = false;

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
      usuario:['',[Validators.required]],
      password:['',Validators.required]
    });
  }

  public submitFormulario(){
    console.log(this.ingreso);
    if(this.ingreso.invalid){
      Object.values(this.ingreso.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    } else
    console.log(this.ingreso.value);
  }

  public get f():any{
    
    return this.ingreso.controls;
  }



}


