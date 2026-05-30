import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
/**.  1.-traemos un short para ocupar los ambientes y de esa manera trabajaos con las llamadas a httpclient*/
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) 
  { }


  login(email: string, password: string){
      return this.http.post(`${this.apiUrl}/api/v1/auth/login`, {email, password});
  }

  register(name:string, email: string, password: string)
  {
      return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {name, email, password});
  }
}
