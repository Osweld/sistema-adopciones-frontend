import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hora } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class HoraCitaService {
  baseUrl:string = environment.baseUrl+"/api/v1/hora-cita-solicitud"

  constructor(private http:HttpClient) { }

  getHorasCita():Observable<Hora[]>{
    const url = `${this.baseUrl}`
    return this.http.get<Hora[]>(url);
  }
}
