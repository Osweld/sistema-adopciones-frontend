import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Especie } from '../interfaces/pets.interface';
import { Observable, catchError, of } from 'rxjs';
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

  getEspecieById(id:  number):Observable<Especie | undefined>{
    return this.http.get<Especie>(`${this.baseUrl}/${id}`).
            pipe(
              catchError(error => of(undefined))
            )
  }

  addEspecie(especie:Especie):Observable<Especie>{
    return this.http.post<Especie>(`${this.baseUrl}`,especie);
  }

  updateEspecie(especie:Especie):Observable<Especie>{
    if(!especie.id) throw Error('Is require');

    return this.http.put<Especie>(`${this.baseUrl}/${especie.id}`,especie);
  }

  deleteEspecieById(id:number):Observable<Especie>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Especie>(url)
  }
}
