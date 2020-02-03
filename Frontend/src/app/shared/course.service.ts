import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class courseService {
  newCourse: Course = {
    _id:'',
    coursename: '',
    coursecode: '',
    courseprice: '',
    discountedprice: '',
    courseduration: '',
    teachername: '',
    coursepicture: null,
    coursedescription: '',
    coursecategory: '',
    lesson:[]
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  

  constructor(private http: HttpClient) { }

  postFile(file: FormData){
    return this.http.post(environment.apiBaseUrl+'/uploadfile',file);
  }

  postCourse(course: Course){
    return this.http.post(environment.apiBaseUrl+'/newcourse',course);
  }

  getAllCourse(){
    return this.http.get(environment.apiBaseUrl+'/getallcourses');
  }

  getCoursebycode(code){
    return this.http.get(environment.apiBaseUrl+'/getcourse/'+code);
  }

  getCoursebyId(id){
    return this.http.get(environment.apiBaseUrl+'/getcoursebyid/'+id);
  }

  updateCourse(course: Course,id){
    return this.http.patch(environment.apiBaseUrl+'/updatecourse/'+id,course);
  }

  deleteCourse(id){
    return this.http.delete(environment.apiBaseUrl+'/deletecourse/'+id);
  }

  print(){
    return this.newCourse;
  }
}
