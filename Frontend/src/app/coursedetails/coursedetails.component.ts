import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { courseService } from '../shared/course.service';
import { Course } from '../shared/course.model';
import { Lesson } from '../shared/lesson.model';
import { UserService } from '../shared/user.service';
import { RegisterCourseService } from '../shared/register-course.service';
import { formatDate } from '@angular/common';
import { RegisterCourse } from '../shared/registercourse.model';

@Component({
  selector: 'coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent implements OnInit {
  user: any;
  userid: any;
  allRegisteredCourse: RegisterCourse[];
  regcourseid= [];
  

  constructor(
    private elRef: ElementRef, 
    private route: ActivatedRoute, 
    private courseservice: courseService,
    private UserService: UserService,
    private registerCourse: RegisterCourseService) { }
  code;
  view="";
  isView=false;
  course = new Course();
  courselessons:Array<Lesson> =[];
  videolink;
  courseAccess: boolean;

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.code=params.get('code');
      this.view=params.get('view');
    });
    if(this.view){
      this.code=this.view;
      this.isView=true;
    }

    this.UserService.getUserProfile().subscribe(
      res=>{
        this.user = res['user'];
        this.userid=this.user._id;
        this.usercourse();
    });
    
      
    
  }

  usercourse(){
    this.registerCourse.getRegisterCoursebyid(this.userid).subscribe(
      res=>{
        this.allRegisteredCourse=res as RegisterCourse[];
        for(var regCourse of this.allRegisteredCourse){
          if(!regCourse.isexpired)
            this.regcourseid.push(regCourse.courseid);
        }
        this.setExpiry();
        this.refresh();
      },
      err=>{console.log(err);}
    );
  }

  refresh() {
    
    this.courseservice.getCoursebycode(this.code).subscribe(
      res=>{
        this.course=res['0'] as Course;
        this.courselessons=this.course.lesson as Lesson[];
        this.getcourseaccess(this.course._id);
        if(!this.isView && this.courseAccess){
          
          for(var lesson of this.courselessons){
            
            if(lesson.type=="Video"){
              this.videolink = "./assets/uploads/"+lesson.file;
              
              const player = this.elRef.nativeElement.querySelector('video');
              player.load();
              break;
            }
              
          }
        }
        
      },
      err=>{
        console.log(err);
      });
  }
  setExpiry() {
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

  setvideo(lesson){
    if(lesson.type=="Video" && !this.isView && this.courseAccess){
      this.videolink =  "./assets/uploads/"+lesson.file;
      const player = this.elRef.nativeElement.querySelector('video');
      player.load();
    }
    if(lesson.type=="Document" && !this.isView && this.courseAccess){
      var link = document.createElement('a');
      link.href= "./assets/uploads/"+lesson.file
      link.download=lesson.title;
      link.click();
    }
    
  }

  getcourseaccess(id){
    this.courseAccess = this.regcourseid.includes(id);
  }

}
