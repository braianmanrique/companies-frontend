import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: any[];
  public user: User ;

  constructor(private  sidebarService: SidebarService, private userService : UserService) { 
    this.menuItems = this.sidebarService.menu;
    console.log(this.menuItems)
    this.user = this.userService.user

  }
  logout(){
    this.userService.logout();
  }
}
