import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userDetails;
  fullname;
  isadmin: boolean;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isadmin= this.userService.isAdmin();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.fullname=this.userDetails.fullName;
        if (this.userDetails.role=="admin") {
          this.isadmin = true;
        };
        
      },
      err => { 
        console.log(err);
        
      }
    );
    
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
