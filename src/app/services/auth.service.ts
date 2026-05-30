import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
/**.  1.-traemos un short para ocupar los ambientes y de esa manera trabajaos con las llamadas a httpclient*/
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) 
  { }


  login(email: string, password: string){

  }
}
