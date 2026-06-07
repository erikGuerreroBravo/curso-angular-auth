import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
/**.  1.-traemos un short para ocupar los ambientes y de esa manera trabajaos con las llamadas a httpclient*/
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs/internal/operators/switchMap';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient) 
  { }


  login(email: string, password: string){
      return this.http.post(`${this.apiUrl}/api/v1/auth/login`, {email, password});
  }

  register(name:string, email: string, password: string)
  {
      return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {name, email, password});
  }

  registerAndLogin(name:string , password: string)
  {
    /**en este metodo se encarga de registrar y luego iniciar sesión */
      return this.register(name, name, password).pipe(
        switchMap(() => this.login(name, password))
      )
  }

  isAvailable(email:string){
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/api/v1/auth/is-available`,{email}
    );
  }
}
