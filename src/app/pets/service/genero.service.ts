import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from 'src/app/auth/interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  baseUrl:string = environment.baseUrl+"/api/v1/generos"

  constructor(private http:HttpClient) { }

  getAllGeneros():Observable<Genero[]>{
    return this.http.get<Genero[]>(this.baseUrl)
  }
}
