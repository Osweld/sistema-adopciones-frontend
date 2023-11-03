import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Raza } from '../interfaces/pets.interface';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  baseUrl:string = environment.baseUrl+"/api/v1/razas"

  constructor(private http:HttpClient) { }

  getAllRazas():Observable<Raza[]>{
    return this.http.get<Raza[]>(this.baseUrl)
  }

  getAllRazaByEspecieId(idEspecie:Number):Observable<Raza[]>{
    const url = `${this.baseUrl}/especie/${idEspecie}`;
    return this.http.get<Raza[]>(url)
  }

  getRazaById(id:  number):Observable<Raza | undefined>{
    return this.http.get<Raza>(`${this.baseUrl}/${id}`).
            pipe(
              catchError(error => of(undefined))
            )
  }

  addRaza(especie:Raza):Observable<Raza>{
    return this.http.post<Raza>(`${this.baseUrl}`,especie);
  }

  updateRaza(especie:Raza):Observable<Raza>{
    if(!especie.id) throw Error('Is require');

    return this.http.put<Raza>(`${this.baseUrl}/${especie.id}`,especie);
  }

  deleteRazaById(id:number):Observable<Raza>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Raza>(url)
  }
}
