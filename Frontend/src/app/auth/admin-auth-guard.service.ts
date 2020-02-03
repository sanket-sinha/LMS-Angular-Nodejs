import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class adminAuthGuardService implements CanActivate{
  user;
  admin= false;
  canActivate(){
    this.userService.getUserProfile().subscribe(res=>{
      this.user = res['user'];
    });
    if (this.user && this.user.role) {
      this.admin=true;
      return true
    };
    this.router.navigate(['/dashboard'])
    return false;
  }

  constructor(private router: Router,
    private userService : UserService) { }
}
