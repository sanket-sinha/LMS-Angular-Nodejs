import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course.model';
import { Lesson } from '../shared/lesson.model';
import { courseService } from '../shared/course.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
  lesson= new Lesson;
  CourseLessons:Array<Lesson> =[];
  showSucessMessage: boolean;
  serverErrorMessages: string;
  selectedFile: File = null;
  filesToUpload: Array<File> = [];
  fd = new FormData();
  constructor(private route: ActivatedRoute, private courseService: courseService) { }
  id;
  isUpdate=false;
  ngOnInit() {
    this.clearform();
    this.route.paramMap.subscribe(params=>{
      this.id=params.get('id');
    });
    if(!this.id){
      this.CourseLessons.push(this.lesson);
    }
    else{
      this.courseService.getCoursebyId(this.id).subscribe(
        res=>{
          console.log(res);
          this.courseService.newCourse=res as Course;
          this.courseService.print();
          this.CourseLessons=this.courseService.newCourse.lesson as Lesson[];
          this.isUpdate=true;
          console.log(!this.isUpdate);
        },
        err=>{
          console.log(err);
        }
      );
    }
      
      
  }

  addForm(){
    this.lesson= new Lesson;
    this.CourseLessons.push(this.lesson);
  }

  removeForm(index){
    this.CourseLessons.splice(index,1);
  }

  

  handelFileInput(event){
    this.filesToUpload.push(<File>event.target.files[0]);
  }
  submitForm(){
    for(let cs of this.CourseLessons){
      if(cs.type != "Title")
        cs.file=cs.file.split('\\').pop();
    }
    this.courseService.newCourse.lesson=this.CourseLessons;
    
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for(let i =0; i < files.length; i++){
      this.fd.append("file", files[i], files[i]['name']);
    }
    console.log(this.fd);
    this.courseService.newCourse.coursepicture=this.courseService.newCourse.coursepicture.split('\\').pop();
    console.log(this.courseService.print());
    console.log(this.CourseLessons);
    
    this.courseService.postFile(this.fd).subscribe(
      res => {
        //this.showSucessMessage = true;
        //setTimeout(() => this.showSucessMessage = false, 4000);
        if(this.isUpdate){
          console.log('update');
          this.courseService.updateCourse(this.courseService.newCourse,this.id).subscribe(
            res => {
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
          },
          err => {
            console.log(err);
            if (err.status === 422) {
              this.serverErrorMessages = err.error.join('<br/>');
            }
            else
      
              this.serverErrorMessages = 'Something went wrong in upadate.Please contact admin.';
          }
        );
        }
  
        else{
          this.courseService.postCourse(this.courseService.newCourse).subscribe(
            res => {
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
          },
          err => {
            console.log(err);
            if (err.status === 422) {
              this.serverErrorMessages = err.error.join('<br/>');
            }
            else
      
              this.serverErrorMessages = 'Something went wrong add.Please contact admin.';
          }
        );
        }
      },
      err => {
        console.log(err);
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else

          this.serverErrorMessages = 'Something went wrong upload.Please contact admin.';
      }
    );
    console.log(this.courseService.print());
      
      
  this.clearform();
  }

  clearform(){
    this.courseService.newCourse.coursecategory='';
    this.courseService.newCourse.coursecode='';
    this.courseService.newCourse.coursedescription='';
    this.courseService.newCourse.courseduration='';
    this.courseService.newCourse.coursename='';
    this.courseService.newCourse.coursepicture='';
    this.courseService.newCourse.courseprice='';
    this.courseService.newCourse.discountedprice='';
    this.courseService.newCourse.lesson={};
    this.courseService.newCourse.teachername='';
    this.filesToUpload=[];
    this.CourseLessons=[];
    
    this.fd = new FormData();
  }


}
