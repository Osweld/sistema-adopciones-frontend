import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genero } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  baseUrl:string = environment.baseUrl+"/api/v1/generos"

  constructor(private http:HttpClient) { }

  getAllGeneros():Observable<Genero[]>{
    const url = `${this.baseUrl}`;
    return this.http.get<Genero[]>(url)
  }
}
