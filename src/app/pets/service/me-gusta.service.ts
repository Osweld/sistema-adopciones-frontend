import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MascotaId } from '../interfaces/pets.interface';

@Injectable({
  providedIn: 'root'
})
export class MeGustaService {

  baseUrl:string = environment.baseUrl+"/api/v1/me-gusta"

  constructor(private http:HttpClient) { }

  saveOrDeleteLike(idMascota:number):Observable<any>{
    const url = `${this.baseUrl}/save-delete/${idMascota}`
    return this.http.post<any>(url,{})
  }

  getAllLikesByUsuario():Observable<MascotaId[]>{
  const url = `${this.baseUrl}/usuario`
    return this.http.get<MascotaId[]>(url)
  }
}
