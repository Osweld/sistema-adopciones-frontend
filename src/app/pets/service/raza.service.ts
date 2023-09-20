import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Raza } from '../interfaces/pets.interface';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  baseUrl:string = environment.baseUrl+"/api/v1/razas"

  constructor(private http:HttpClient) { }

  getAllRazaByEspecieId(idEspecie:Number):Observable<Raza[]>{
    const url = `${this.baseUrl}/especie/${idEspecie}`;
    return this.http.get<Raza[]>(url)
  }
}
