import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from '../shared/course.service';
import { Course } from '../shared/course.model';
import { RegisterCourse } from '../shared/registercourse.model';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { formatDate } from '@angular/common';
import { RegisterCourseService } from '../shared/register-course.service';

@Component({
  selector: 'register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {
  userDetails;
  showSucessMessage: boolean;
  serverErrorMessages: any;

  constructor(
      private route: ActivatedRoute, 
      private courseservice: courseService, 
      private userService: UserService,
      private registerCourseService: RegisterCourseService,
      private router: Router) { }
  code;
  course = new Course();
  registercourse = new RegisterCourse();
  price;
  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.code=params.get('code');
    });
    this.courseservice.getCoursebycode(this.code).subscribe(
      res=>{
        this.course=res['0'] as Course;
        if(this.course.discountedprice == "")
          this.price=this.course.courseprice;
        else
          this.price=this.course.discountedprice;
      },
      err=>{
        console.log(err);
      });
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
        },
        err => { 
          console.log(err);
          
        }
      );
  }

  checkout(){
    var today = new Date();
    this.registercourse.courseid=this.course._id;
    this.registercourse.studentid=this.userDetails._id;
    this.registercourse.startingdate=formatDate(today,'dd-MM-yyyy','en-US');
    this.registercourse.expirydate=formatDate(today.setMonth(today.getMonth()+3),'dd-MM-yyyy','en-US');
    this.registercourse.isexpired=false;
    this.registerCourseService.postRegisterCourse(this.registercourse).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => {
          this.showSucessMessage = false;
          this.router.navigateByUrl('/mycourse');
        }, 5000);
        
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
    
  }

}
