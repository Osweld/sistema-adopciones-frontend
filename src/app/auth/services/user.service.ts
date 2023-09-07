import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPage } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = "http://localhost:8080/api/v1/usuarios"

  constructor(private http:HttpClient) { }

  getAllMarcas(page:Number):Observable<UserPage>{
    const url = `${this.baseUrl}?page=${page}&size=10`;
    return this.http.get<UserPage>(url)
  }

}
