import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public user: User ;

  constructor(private userService : UserService,private router: Router) {
    this.user = this.userService.user
   }
  logout(){
    this.userService.logout();
  }
}
