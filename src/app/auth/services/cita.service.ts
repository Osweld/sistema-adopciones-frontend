import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cita, CitaPage } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  baseUrl:string = environment.baseUrl+"/api/v1/cita-solicitud-adopcion"

  constructor(private http:HttpClient) { }

  createCita(cita:Cita):Observable<Cita>{
    const url = `${this.baseUrl}`;
    return this.http.post<Cita>(url,cita)
  }

  getCitaByUsuario(page:number):Observable<CitaPage>{
    const url = `${this.baseUrl}/usuario?page=${page}&size=10`;
    return this.http.get<CitaPage>(url)
  }

  getCitaByDate(fecha:Date):Observable<Cita[]>{
    const url = `${this.baseUrl}/fecha-cita/${fecha}`;
    return this.http.get<Cita[]>(url)
  }
}
