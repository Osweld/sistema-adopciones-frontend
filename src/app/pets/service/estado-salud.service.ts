import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoSalud } from '../interfaces/pets.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoSaludService {

  baseUrl:string = environment.baseUrl+"/api/v1/estado-salud"

  constructor(private http:HttpClient) { }

  getAllEstadoSalud():Observable<EstadoSalud[]>{
    return this.http.get<EstadoSalud[]>(this.baseUrl)
  }

  getEstadoSaludById(id:  number):Observable<EstadoSalud | undefined>{
    return this.http.get<EstadoSalud>(`${this.baseUrl}/${id}`).
            pipe(
              catchError(error => of(undefined))
            )
  }

  addEstadoSalud(estadoSalud:EstadoSalud):Observable<EstadoSalud>{
    return this.http.post<EstadoSalud>(`${this.baseUrl}`,estadoSalud);
  }

  updateEstadoSalud(estadoSalud:EstadoSalud):Observable<EstadoSalud>{
    if(!estadoSalud.id) throw Error('Is require');

    return this.http.put<EstadoSalud>(`${this.baseUrl}/${estadoSalud.id}`,estadoSalud);
  }

  deleteEstadoSaludById(id:number):Observable<EstadoSalud>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<EstadoSalud>(url)
  }
}
