import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  baseUrl:string = environment.baseUrl+"/api/v1/mascotas"

  constructor(private http:HttpClient) { }

  getMascotaById(id:Number):Observable<Mascota>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Mascota>(url)
  }
}
