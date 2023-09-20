import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota, MascotasPage } from '../interfaces/pets.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  baseUrl:string = environment.baseUrl+"/api/v1/mascotas"

  constructor(private http:HttpClient) { }

  getAllMascotasPage(page:Number):Observable<MascotasPage>{
    const url = `${this.baseUrl}?page=${page}&size=10`;
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


}
