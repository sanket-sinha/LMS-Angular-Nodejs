import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    _id:'',
    fullName: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    pincode: '',
    role: '',
    password: ''
  };

  loggedUser: User = {
    _id:'',
    fullName: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    pincode: '',
    role: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  user: any;
  

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
    if (user.role){user.role='admin';}
    else{user.role='student';}
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  getStudents() {
    return this.http.get(environment.apiBaseUrl + '/studentsprofile');
  }

  updateUserProfile(id,user: User) {
    return this.http.patch(environment.apiBaseUrl + '/user/'+id,user);
  }

  isAdmin(){
    this.getUserProfile().subscribe(res=>{
      this.user = res['user'];
    });
    if (this.user && this.user.role=="admin") {
      return true;
    };
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
