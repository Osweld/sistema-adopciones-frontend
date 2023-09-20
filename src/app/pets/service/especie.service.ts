import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Especie } from '../interfaces/pets.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  baseUrl:string = environment.baseUrl+"/api/v1/especies"

  constructor(private http:HttpClient) { }

  getAllEspecies():Observable<Especie[]>{
    return this.http.get<Especie[]>(this.baseUrl)
  }
}
