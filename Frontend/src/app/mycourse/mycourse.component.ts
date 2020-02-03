import { Component, OnInit } from '@angular/core';
import { courseService } from '../shared/course.service';
import { Course } from '../shared/course.model';
import { UserService } from '../shared/user.service';
import { RegisterCourseService } from '../shared/register-course.service';
import { RegisterCourse } from '../shared/registercourse.model';
import { formatDate } from '@angular/common';


@Component({
  selector: 'mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.css']
})
export class MycourseComponent implements OnInit {
  

  constructor(
    private courseservice: courseService, 
    private UserService: UserService, 
    private registerCourse: RegisterCourseService) { }
  user: { _id: any; };    
  userid: any;
  allCourse: Course[];
  allRegisteredCourse: RegisterCourse[];
  regcourseid=[];
  isadmin;
  isCourseAvailable= true;
  ngOnInit() {
    this.UserService.getUserProfile().subscribe(
      res=>{
        this.user = res['user'];
        this.userid=this.user._id;
        this.refreshlist();
    });
    this.isadmin= this.UserService.isAdmin();
  }


  refreshlist(){
    this.registerCourse.getRegisterCoursebyid(this.userid).subscribe(
      res=>{
        this.allRegisteredCourse=res as RegisterCourse[];
        this.setExpiry();
      },
      err=>{console.log(err);}
    );
  }

  getExpirydate(id){
    for(var regCourse of this.allRegisteredCourse){
      if(regCourse.courseid==id)
        return regCourse.expirydate;        
    }
  }

  setExpiry(){
    var date = new Date();
    var today = formatDate(date,'dd-MM-yyyy','en-US');
    for(var regCourse of this.allRegisteredCourse){
      if(regCourse.expirydate==today){
        regCourse.isexpired=true;
        this.registerCourse.setExpiry(regCourse).subscribe(
          res=>{this.getAllCourse()},
          err=>{console.log(err);}
        );
      }
    }
    this.getAllCourse()
  }

  getAllCourse(){
    this.courseservice.getAllCourse().subscribe(
      res=>{
        this.allCourse=res as Course[];
        for(var regCourse of this.allRegisteredCourse){
          if(!regCourse.isexpired)
            this.regcourseid.push(regCourse.courseid);
        }
        
        if(this.regcourseid.length>0){
          for(var course of this.allCourse){
            if(!this.regcourseid.includes(course._id)){
              
              this.allCourse.splice(this.allCourse.indexOf(course),1);
              
            }
          }
        }

        else{ 
          this.allCourse.splice(0);
          this.isCourseAvailable=false;
        }
        
      },
      err=>{console.log(err);}
    );
  }

}
