import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Solicitud, SolicitudPage, VerificarSolicitudDatos } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  baseUrl:string = environment.baseUrl+"/api/v1/solicitud-adopcion"


  constructor(private http:HttpClient) { }

  getSolicitudesWithPagination(page:Number):Observable<SolicitudPage>{
    const url = `${this.baseUrl}?page=${page}&size=20`;
    return this.http.get<SolicitudPage>(url)
  }

  verificarSolicitud(datos:VerificarSolicitudDatos):Observable<Solicitud>{
    const url = `${this.baseUrl}/verificar`
    return this.http.put<Solicitud>(url,datos)
  }

  getSolicitudByUsuarioAndEstadoEnProceso():Observable<Solicitud>{
    const url = `${this.baseUrl}/proceso`
    return this.http.get<Solicitud>(url);
  }

  getLastFiveSolicitudesRechazadas(page:number):Observable<SolicitudPage>{
    const url = `${this.baseUrl}/rechazadas?page=${page}&size=10`
    return this.http.get<SolicitudPage>(url);
  }




}
