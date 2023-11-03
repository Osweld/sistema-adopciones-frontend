import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foto, Mascota, MascotasPage } from '../interfaces/pets.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  baseUrl:string = environment.baseUrl+"/api/v1/mascotas"

  constructor(private http:HttpClient) { }

  getAllMascotasPage(page:Number):Observable<MascotasPage>{
    const url = `${this.baseUrl}?page=${page}&size=20`;
    return this.http.get<MascotasPage>(url)
  }

  getAllMascotasPageByEstadoDisponible(page:Number):Observable<MascotasPage>{
    const url = `${this.baseUrl}/estado-mascota?page=${page}&size=20`;
    return this.http.get<MascotasPage>(url)
  }

  getMascotaById(id:Number):Observable<Mascota>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Mascota>(url)
  }

  saveMascota(mascota:Mascota):Observable<Mascota>{
    const url = `${this.baseUrl}`;
    return this.http.post<Mascota>(url,mascota)
  }

  editMascota(id:number,mascota:Mascota):Observable<Mascota>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Mascota>(url,mascota)
  }

  deleteMascotaById(id:Number):Observable<Mascota>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Mascota>(url)
  }

  uploadFotoPrincipal(id:Number,fd:FormData):Observable<Mascota>{
    const url = `${this.baseUrl}/foto-perfil/${id}`;
    return this.http.post<Mascota>(url,fd)
  }

  uploadFotos(id:Number,fd:FormData):Observable<Mascota>{
    const url = `${this.baseUrl}/fotos/${id}`;
    return this.http.post<Mascota>(url,fd)
  }

  getFotosByMascotaId(id:Number):Observable<Foto[]>{
    const url = `${this.baseUrl}/fotos/${id}`;
    return this.http.get<Foto[]>(url)
  }

  getFotos():Observable<Foto[]>{
    const url = `${this.baseUrl}/fotos`;
    return this.http.get<Foto[]>(url)
  }

}
