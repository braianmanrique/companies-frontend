import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard  {
  constructor(private userService: UserService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     if(this.userService.role === 'ADMIN_ROLE'){
      return true;
     }else{
      this.router.navigateByUrl('/dashboard')
      return false;
     }

  }
  
}
