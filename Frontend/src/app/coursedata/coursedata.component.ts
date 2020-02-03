import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { RegisterCourseService } from '../shared/register-course.service';
import { courseService } from '../shared/course.service';
import { RegisterCourse } from '../shared/registercourse.model';
import { Course } from '../shared/course.model';
import { User } from '../shared/user.model';
import { CourseData } from '../shared/coursedata.model';
import * as XLSX from 'xlsx';
@Component({
  selector: 'coursedata',
  templateUrl: './coursedata.component.html',
  styleUrls: ['./coursedata.component.css']
})
export class CoursedataComponent implements OnInit {

  allRegisteredCourse: RegisterCourse[];
  allCourse: Course[];
  allStudents: User[];
  allCourseData: Array<CourseData>=[];
  filterQuery="";
  rowsOnPage = 10;
  sortBy = "start date";
  sortOrder = "asc";
  today = Date();

  constructor(
    private userService: UserService, 
    private registerdCourseService: RegisterCourseService,
    private courseService: courseService) { }

  ngOnInit() {
    this.registerdCourseService.getAllRegisterCourse().subscribe(
      res=>{
        this.allRegisteredCourse=res as RegisterCourse[];
        this.getcoursedetails();
        
      },
      err=>{
        console.log(err);
      });
  }

  getcoursedetails(){
    this.courseService.getAllCourse().subscribe(res=>{
      this.allCourse=res as Course[];
      this.getuserdetails();
    },
    err=>{
      console.log(err);
    });
  }

  getuserdetails(){
    this.userService.getStudents().subscribe(res=>{
      this.allStudents=res as User[];
      this.createcoursedata();
    },
    err=>{
      console.log(err);
    });
  }

  createcoursedata(){
    for(var regCourse of this.allRegisteredCourse){
      var coursedata= new CourseData;
      for(var course of this.allCourse){
        if(course._id==regCourse.courseid){
          coursedata.coursename=course.coursename;
          coursedata.coursecode=course.coursecode;
          break;
        }
      }
      for(var student of this.allStudents){
        if(student._id==regCourse.studentid){
          coursedata.name=student.fullName;
          coursedata.phone=student.telephone;
          coursedata.email=student.email;
          break;
        }
      }
      coursedata.startdate=regCourse.startingdate;
      coursedata.enddate=regCourse.expirydate;
      this.allCourseData.push(coursedata);
    }


  }


  print(){
    var filename = 'Transaction Details '+  this.today + '.xlsx'
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.allCourseData);
    const workBook: XLSX.WorkBook = { Sheets: { 'data': worksheet },SheetNames:['data']};
    XLSX.writeFile(workBook, filename);
  }
}
