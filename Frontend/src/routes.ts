import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MycourseComponent } from './mycourse/mycourse.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { adminAuthGuardService } from './auth/admin-auth-guard.service';
import { NotFoundComponent } from './notfound/notfound.component';
import { CourseComponent } from './course/course.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { CoursedataComponent } from './coursedata/coursedata.component';
import { AnnoucementComponent } from './annoucement/annoucement.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { CompletecourseComponent } from './completecourse/completecourse.component';
import { GetCertificateComponent } from './get-certificate/get-certificate.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'mycourse', component: MycourseComponent, canActivate: [AuthGuard]},
    {path: 'course', component: CourseComponent, canActivate: [AuthGuard]},
    {path: 'mycourse/:code', component: CoursedetailsComponent, canActivate: [AuthGuard]},
    {path: 'course/:view', component: CoursedetailsComponent, canActivate: [AuthGuard]},
    {path: 'addcourse', component: AddcourseComponent, canActivate: [AuthGuard, adminAuthGuardService]},
    {path: 'editcourse/:id', component: AddcourseComponent, canActivate: [AuthGuard, adminAuthGuardService]},
    {path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGuard]},
    {path: 'coursedata', component: CoursedataComponent, canActivate: [AuthGuard, adminAuthGuardService]},
    {path: 'annoucements', component: AnnoucementComponent, canActivate: [AuthGuard, adminAuthGuardService]},
    {path: 'students', component: StudentsDetailsComponent, canActivate: [AuthGuard, adminAuthGuardService]},
    {path: 'registercourse/:code', component: RegisterCourseComponent, canActivate: [AuthGuard]},
    {path: 'completecourse', component: CompletecourseComponent, canActivate: [AuthGuard]},
    {path: 'certificate', component: GetCertificateComponent, canActivate: [AuthGuard]},
    {path: 'no-access', component: NotFoundComponent, canActivate: [AuthGuard]}
];