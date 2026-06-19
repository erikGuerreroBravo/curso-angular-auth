import { Injectable } from '@angular/core';
import { jwtDecode , JwtPayload} from 'jwt-decode';

import {getCookie, setCookie, removeCookie} from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string)
  {
    //localStorage.setItem('token',token);
    /* establecemos el token en una cookie */
    setCookie('token-trello',token, { expires: 365, path: '/'});
  }
  getToken(){
    //const token = localStorage.getItem('token');
    const token = getCookie('token-trello');
    return token;
  }
  removeToken(){
    //localStorage.removeItem('token');
    removeCookie('token-trello', { path: '/' });
  }

  isValidToken()
  {
    const token = this.getToken();
    if(!token){
      return false;
    }
    //implementamos nuestra libreria instalada.
    const decodetoken = jwtDecode<JwtPayload>(token);
    if(decodetoken && decodetoken){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodetoken.exp!);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
