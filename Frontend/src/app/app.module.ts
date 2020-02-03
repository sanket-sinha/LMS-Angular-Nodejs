// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';



// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { MycourseComponent } from './mycourse/mycourse.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { CourseComponent } from './course/course.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { CoursedataComponent } from './coursedata/coursedata.component';
import { AnnoucementComponent } from './annoucement/annoucement.component';
import { CompletecourseComponent } from './completecourse/completecourse.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';

//routes
import { appRoutes } from './routes';

//service
import { UserService } from './shared/user.service';
import { courseService } from './shared/course.service';
import { RegisterCourseService } from './shared/register-course.service';
import { AnnoucementService } from './shared/annoucement.service';

//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { adminAuthGuardService } from './auth/admin-auth-guard.service';
import { DataTableModule } from 'angular-6-datatable';
import { DataFilterPipe } from './data-filter.pipe';
import { StudentFilterPipe } from './student-filter.pipe';
import { GetCertificateComponent } from './get-certificate/get-certificate.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    DashboardComponent,
    FooterComponent,
    MycourseComponent,
    MyprofileComponent,
    NavbarComponent,
    CoursedetailsComponent,
    NotFoundComponent,
    AddcourseComponent,
    CourseComponent,
    RegisterCourseComponent,
    CoursedataComponent,
    DataFilterPipe,
    AnnoucementComponent,
    StudentsDetailsComponent,
    StudentFilterPipe,
    CompletecourseComponent,
    GetCertificateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    DataTableModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,
  UserService,
  courseService,
  RegisterCourseService,
  adminAuthGuardService,
  AnnoucementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
