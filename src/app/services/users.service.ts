import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from '@environments/environment.prod';

import  { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor'; 

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;

  /* este servicio se encarga de manejar las operaciones relacionadas con los usuarios, 
  como obtener la información del usuario actual, actualizar el perfil, etc. */
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  getUsers(){
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`,{
         context:checkToken()
        }
      
    );
  }


}
