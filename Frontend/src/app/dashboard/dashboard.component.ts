import { Component, OnInit } from '@angular/core';
import { AnnoucementService } from '../shared/annoucement.service';
import { Annoucement } from '../shared/annoucement.model';
import { Course } from '../shared/course.model';
import { courseService } from '../shared/course.service';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { RegisterCourseService } from '../shared/register-course.service';
import { formatDate } from '@angular/common';
import { RegisterCourse } from '../shared/registercourse.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private courseservice: courseService,
    private annoucementService: AnnoucementService,
    private userService: UserService,
    private registerCourse: RegisterCourseService
    ) { }
  allannoucement: Array<Annoucement>=[];
  allCourse: any[];
  allStudentsData: Array<User>=[];
  isadmin: any;
  user: any;
  userid: any;
  allRegisteredCourse: Array<RegisterCourse>=[];
  allCompletedCourse: Array<RegisterCourse>=[];

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res=>{
        this.user = res['user'];
        this.userid=this.user._id;
        if (this.user.role=="admin") {
          this.isadmin = true;
        };
        this.refreshList();
        this.studentCount();
        this.registerCourseCount();
        this.completedCourseCount();
    });
    
  }

  refreshList(){
    this.annoucementService.getAllAnnoucement().subscribe(
      res=> { 
        this.allannoucement=res as Annoucement[];
        this.allannoucement.reverse();
      },
      err=> { console.log(err); }
    );
    this.courseservice.getAllCourse().subscribe(
      res=>{
        this.allCourse=res as Course[];
      }
    );
  }
  studentCount(){
    this.userService.getStudents().subscribe(res=>{
      this.allStudentsData=res as User[];
    },
    err=>{
      console.log(err);
    });
  }

  registerCourseCount(){
    this.registerCourse.getRegisterCoursebyid(this.userid).subscribe(
      res=>{
        this.allRegisteredCourse=res as RegisterCourse[];
        this.setExpiry();
      },
      err=>{console.log(err);}
    );
  }

  setExpiry(){
    var date = new Date();
    var today = formatDate(date,'dd-MM-yyyy','en-US');
    for(var regCourse of this.allRegisteredCourse){
      if(regCourse.expirydate==today){
        regCourse.isexpired=true;
        this.registerCourse.setExpiry(regCourse).subscribe(
          res=>{},
          err=>{console.log(err);}
        );
      }
    }
  }

  completedCourseCount(){
    this.registerCourse.getCompletedCoursebyid(this.userid).subscribe(
      res=>{
        this.allCompletedCourse=res as RegisterCourse[];
      },
      err=>{console.log(err);}
    )
  }

}
