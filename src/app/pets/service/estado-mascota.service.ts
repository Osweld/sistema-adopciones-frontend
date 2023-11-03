import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estado } from '../interfaces/pets.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoMascotaService {

  baseUrl:string = environment.baseUrl+"/api/v1/estado-mascota"

  constructor(private http:HttpClient) { }

  getAllestadoMascota():Observable<Estado[]>{
    return this.http.get<Estado[]>(this.baseUrl)
  }
}
