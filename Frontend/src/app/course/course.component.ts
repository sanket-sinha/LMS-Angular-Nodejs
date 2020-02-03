import { Component, OnInit } from '@angular/core';
import { courseService } from '../shared/course.service';
import { Course } from '../shared/course.model';
import { UserService } from '../shared/user.service';
import { RegisterCourseService } from '../shared/register-course.service';
import { RegisterCourse } from '../shared/registercourse.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  

  constructor(
    private courseservice: courseService, 
    private UserService: UserService,
    private registerCourse: RegisterCourseService) { }

  allCourse: Course[];
  allRegisteredCourse: RegisterCourse[];
  regcourseid= [];
  isadmin;
  user: { _id: any; };    
  userid: any;
  ngOnInit() {
    this.isadmin= this.UserService.isAdmin();
    this.UserService.getUserProfile().subscribe(
      res=>{
        this.user = res['user'];
        this.userid=this.user._id;
        this.refreshlist();
    });
    
  }

  onDelete(id){
    if(confirm("are you sure to delete this record?")==true){
      this.courseservice.deleteCourse(id).subscribe(
        res =>{
          this.refreshlist();
          console.log('done');
        }

      )
    }
    
  }

  refreshlist(){
    this.registerCourse.getRegisterCoursebyid(this.userid).subscribe(
      res=>{
        this.allRegisteredCourse=res as RegisterCourse[];
        for(var regCourse of this.allRegisteredCourse){
          if(!regCourse.isexpired)
            this.regcourseid.push(regCourse.courseid);
        }
        this.setExpiry();
      },
      err=>{console.log(err);}
    );
    this.courseservice.getAllCourse().subscribe(
      res=>{
        this.allCourse=res as Course[];
      }
    );
  }

  getcourseaccess(id){
    return this.regcourseid.includes(id);
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

  getExpirydate(id){
    for(var regCourse of this.allRegisteredCourse){
      if(regCourse.courseid==id)
        return regCourse.expirydate;        
    }
  }

}
