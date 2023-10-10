import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenRefresh } from '../interfaces/token.interface';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private baseUrl: string = environment.baseUrl + "/api/v1";

  constructor(private http: HttpClient) { }


  refreshToken():Observable<TokenRefresh>{
    const url = `${this.baseUrl}/auth/token/refresh`
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token') || ''}` )
    return this.http.get<TokenRefresh>(url, { headers })
  }



  existToken():boolean{
    if (!localStorage.getItem('token')){
     return false
    }else{
      return true
    }
  }
}
