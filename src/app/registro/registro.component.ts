import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public reg!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.reg= this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      usuario:['',[Validators.required]],
      password:['',Validators.required],
      usuario2:['',[Validators.required]],
      password2:['',Validators.required],
      nombre:['',[Validators.required]],
      apellido:['',Validators.required],
      correo:['',Validators.required]
    });
  }

  public submitFormulario(){
    console.log(this.reg);
    if(this.reg.invalid){
      Object.values(this.reg.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    } else
    console.log(this.reg.value);
  }

  public get f():any{
    
    return this.reg.controls;
  }

}
