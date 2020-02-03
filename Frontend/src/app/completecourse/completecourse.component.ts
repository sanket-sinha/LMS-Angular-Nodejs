import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { UserService } from '../shared/user.service';
import { RegisterCourseService } from '../shared/register-course.service';
import { courseService } from '../shared/course.service';
import { Course } from '../shared/course.model';
import { RegisterCourse } from '../shared/registercourse.model';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { CertificateService } from '../shared/certificate.service';

@Component({
  selector: 'app-completecourse',
  templateUrl: './completecourse.component.html',
  styleUrls: ['./completecourse.component.css']
})
export class CompletecourseComponent implements OnInit {
  
  isadmin: boolean;
  userid: any;
  user: any;
  allCourse: Array<Course>=[];
  allCompletedCourse: Array<RegisterCourse>=[];
  allCourseShow: Array<Course>=[];
  

  constructor(
    private userService: UserService, 
    private registerdCourse: RegisterCourseService,
    private CourseService: courseService,
    private router: Router,
    private certificate: CertificateService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res=>{
        this.user = res['user'];
        this.userid=this.user._id;
        if (this.user.role=="admin") {
          this.isadmin = true;
        };
        this.refreshList();
        
    });
  }

  refreshList(){
    this.CourseService.getAllCourse().subscribe(
      res=>{
        this.allCourse=res as Course[];
        this.completedCourseCount();
      },
      err=>{console.log(err);}
    );
  }

  completedCourseCount(){
    this.registerdCourse.getCompletedCoursebyid(this.userid).subscribe(
      res=>{
        this.allCompletedCourse=res as RegisterCourse[];
        for(var complete of this.allCompletedCourse){
          for(var course of this.allCourse){
            if(course._id==complete.courseid){
              this.allCourseShow.push(course);
            }
          }
        }
      },
      err=>{console.log(err);}
    )
  }

  getExpirydate(id){
    for(var regCourse of this.allCompletedCourse){
      if(regCourse.courseid==id)
        return regCourse.expirydate;        
    }
  }

  /*getCertificate(course,expdate){
    this.certificate.certificate.coursename=course;
    this.certificate.certificate.date=expdate;
    this.certificate.certificate.studentname=this.user.fullName;
    this.router.navigate(['/certificate']);
  }*/
    

}
