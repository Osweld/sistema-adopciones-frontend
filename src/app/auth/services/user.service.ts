import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserPage } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = environment.baseUrl+"/api/v1/usuarios"

  constructor(private http:HttpClient) { }

  getUserWithPagination(page:Number):Observable<UserPage>{
    const url = `${this.baseUrl}?page=${page}&size=20`;
    return this.http.get<UserPage>(url)
  }

  getUserById(id:Number):Observable<User>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url)
  }

  saveUser(user:User):Observable<User>{
    const url = `${this.baseUrl}`;
    return this.http.post<User>(url,user)
  }

  editUser(id:number,user:User):Observable<User>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<User>(url,user)
  }

  deleteUserById(id:Number):Observable<User>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<User>(url)
  }

}
