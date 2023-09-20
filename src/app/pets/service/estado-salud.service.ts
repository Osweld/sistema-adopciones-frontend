import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
