import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { solicitudAdopcion } from '../interfaces/pets.interface';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {

  baseUrl:string = environment.baseUrl+"/api/v1/solicitud-adopcion"

  constructor(private http:HttpClient) { }

  enviarSolicitud(solicitudAdopcion:solicitudAdopcion):Observable<any>{
    const url = `${this.baseUrl}`
    return this.http.post<any>(url,solicitudAdopcion)
  }
}
