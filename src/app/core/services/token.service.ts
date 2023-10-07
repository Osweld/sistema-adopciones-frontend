import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenRefresh } from '../interfaces/token.interface';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }




  existToken():boolean{
    if (!localStorage.getItem('token')){
     return false
    }else{
      return true
    }
  }
}
