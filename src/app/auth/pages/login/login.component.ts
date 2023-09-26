import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { UserService } from '../../services/user.service';
import { Genero, Rol, User } from '../../interfaces/auth.interface';
import { SharedService } from 'src/app/shared/Servicios/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ingreso!: FormGroup;
  public ingresar: boolean = false;
  usu1: string = '';
  pas1: string = '';
  msj: string = 'Ingrese sus credenciales';
  valida: number = 0;
  dataSource: User[] = [];
  //user!: User;

  constructor(
    private fb: FormBuilder,
    public router:Router,
    private userService:UserService,
    private _sharedService: SharedService,
    
  ) { }

  public ngOnInit(): void {
    /*this.userService.getUserWithPagination(0).subscribe(page =>{
      this.dataSource = page.content
    })*/

    this.ingreso= this.createMyForm();
  }

  getValues(u:string, p:string,){
    this.usu1 = u
    this.pas1 = p
    console.warn(this.pas1,"--",this.usu1)
    if(this.usu1=="admin" && this.pas1=="admin" ){
      this.valida = 1
      this._sharedService.mostrarMensaje("green", "admitido", "Bienvenido")
      this.go()
    } else {
      this.msj ="Las credenciales son incorrectas, vuelva a intentar"
    }
  }

  go(){
    this.router.navigate(['/Bienvenido'])
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


