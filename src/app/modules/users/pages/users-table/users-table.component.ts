import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import {AuthService} from '@services/auth.service';
import { User } from '@models/user.model';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent  implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;

  constructor(private usersService: UsersService,
    private authService: AuthService
  ) {
    
    this.dataSource.init([
      
    ]);
  }
   
  //ngOnInit(): void {

    //this.usersService.getUsers().subscribe ((users:any) => {
     // this.dataSource.init(users);
    
   //})
    //this.authService.user$.subscribe(user=>{
      //this.user =  user;
    //})


    //.getprofile().subscribe(user => {
    //this.user = user;
    //})
    ///this.user = this.authService.getDataUser();

  //}

  ngOnInit(): void {
    this.getUsers();
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }


  getUsers(){
    this.usersService.getUsers()
    .subscribe(users => {
      this.dataSource.init(users);
    });

  }



   
}
