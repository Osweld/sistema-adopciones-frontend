import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MascotasPage } from '../interfaces/pets.interface';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  baseUrl:string = "http://localhost:8080/api/v1/mascotas"

  constructor(private http:HttpClient) { }

  getAllMarcas(page:Number):Observable<MascotasPage>{
    const url = `${this.baseUrl}?page=${page}&size=10`;
    return this.http.get<MascotasPage>(url)
  }
}
