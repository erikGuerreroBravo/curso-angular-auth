import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
/**.  1.-traemos un short para ocupar los ambientes y de esa manera trabajaos con las llamadas a httpclient*/
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { TokenService} from '@services/token.service';
import { ResponseLogin } from '@models/auth.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
   ) 
  { }


  login(email: string, password: string){
      return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {email, password}).pipe(
        /*el tap se encarga de ejecutar una acción secundaria sin modificar el flujo de datos, en este caso se encarga de guardar el token en el localstorage */
        tap(response => {
          this.tokenService.saveToken(response.access_token);
        })
      )
  }

  register(name:string, email: string, password: string)
  {
      return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {name, email, password});
  }

  registerAndLogin(name:string, email: string, password: string)
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

  recovery(email:string){
      return  this.http.post(`${this.apiUrl}/api/v1/auth/recovery`,{email});
  }
  
  changePassword(token:string, newPassword:string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, {token,newPassword});
  }

}
