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

  getAllMascotasByPagination(page:Number):Observable<MascotasPage>{
    const url = `${this.baseUrl}?page=${page}&size=10`;
    return this.http.get<MascotasPage>(url)
  }
}
