import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Adopcion, AdopcionPage, CrearAdopcion } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {

  baseUrl:string = environment.baseUrl+"/api/v1/adopcion"

  constructor(private http:HttpClient) { }

  getUAdopcionesrWithPagination(page:Number):Observable<AdopcionPage>{
    const url = `${this.baseUrl}?page=${page}&size=20`;
    return this.http.get<AdopcionPage>(url)
  }

  saveAdopcion(crearAdopcion:CrearAdopcion):Observable<Adopcion>{
    const url = `${this.baseUrl}`;
    return this.http.post<Adopcion>(url,crearAdopcion)
  }

  deleteAdopcionById(id:Number):Observable<Adopcion>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Adopcion>(url)
  }


}
