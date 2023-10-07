import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, LoginResponse } from '../interfaces/session.interface';
import { User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string = environment.baseUrl+"/api/v1/auth"

  constructor(private http:HttpClient) { }

  login(login:Login):Observable<LoginResponse>{
    const url = `${this.baseUrl}/login`;
    return this.http.post<LoginResponse>(url,(login));
  }

  register(user:User):Observable<User>{
    const url = `${this.baseUrl}/register`;
    return this.http.post<User>(url,user)
  }

}
