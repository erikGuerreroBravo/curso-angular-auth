import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { User } from '@models/user.model';
import {AuthService} from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  user: User | null = null;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  constructor(private authService: AuthService, private router: Router) {}
  
  
  ngOnInit(): void {
    this.authService.getprofile().subscribe(user => {
      this.user = user;
    });
  }

  logout(){
    /* este metodo se encarga de eliminar el token del localstorage */
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  

}
