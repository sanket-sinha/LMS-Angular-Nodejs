import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterCourse } from './registercourse.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterCourseService {

  constructor(private http: HttpClient) { }

  postRegisterCourse(registercourse: RegisterCourse){
    return this.http.post(environment.apiBaseUrl+'/registercourse',registercourse);
  }

  getRegisterCoursebyid(id){
    return this.http.get(environment.apiBaseUrl+'/getregistercoursebyid/'+id);
  }

  getCompletedCoursebyid(id){
    return this.http.get(environment.apiBaseUrl+'/getcompletedcoursebyid/'+id);
  }

  getAllRegisterCourse(){
    return this.http.get(environment.apiBaseUrl+'/getallregistercourse');
  }

  setExpiry(registercourse: RegisterCourse){
    return this.http.patch(environment.apiBaseUrl+'/setexpiry/'+registercourse._id,registercourse);
  }
}
