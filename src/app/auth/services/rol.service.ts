import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  baseUrl:string = environment.baseUrl+"/api/v1/roles"

  constructor(private http:HttpClient) { }

  getAllRoles():Observable<Rol[]>{
    const url = `${this.baseUrl}`;
    return this.http.get<Rol[]>(url)
  }
}
