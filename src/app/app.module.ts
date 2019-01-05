import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { AboutComponent } from './about/about.component';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';
import { ManagementComponent } from './management/management.component';
import { ContactComponent } from './contact/contact.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentService} from './service/student.service';
import { GalleryComponent } from './gallery/gallery.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { ProgramComponent } from './program/program.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SchoolComponent } from './school/school.component';
import { SlideshowModule} from 'ng-simple-slideshow';
import { LoginComponent } from './login/login.component';
//import { ResultComponent } from './result/result.component';
import { AdminComponent } from './admin/admin.component';
import { AdminStudentComponent } from './admin/admin-student/admin-student.component';
import { AdminTeacherComponent } from './admin/admin-teacher/admin-teacher.component';
import { AdminCommiteeComponent } from './admin/admin-commitee/admin-commitee.component';
import { TeacherService } from './service/teacher.service';
import { MemberService } from './service/member.service';
import { DepartmentComponent } from './department/department.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { FilterPipe} from './filter.pipe';
// ********************** angular-modal-gallery *****************************
import 'hammerjs'; // <------ mandatory dependency for angular-modal-gallery
import 'mousetrap'; // <------ mandatory dependency for angular-modal-gallery
import { ModalGalleryModule } from 'angular-modal-gallery';
import { RegisterComponent } from './register/register.component'; // <----------------- angular-modal-gallery library import
import { UserService } from './service/user.service';
import { AuthenticationServiceService } from './service/authentication-service.service';
// **************************************************************************


@NgModule({
  declarations: [
    AppComponent,    HomeComponent,    AboutComponent,    FeeStructureComponent,    ManagementComponent,
    ContactComponent,    StudentListComponent,    GalleryComponent,    ProgramComponent,    TeachersComponent,
    SchoolComponent,    LoginComponent,        AdminComponent,    AdminStudentComponent,
    AdminTeacherComponent,    AdminCommiteeComponent,    DepartmentComponent, RegisterComponent, FilterPipe
    ],
  imports: [
    BrowserModule,    FormsModule,    AppRoutingModule,  HttpClientModule, HttpModule,   ReactiveFormsModule,    
    SlideshowModule, ModalGalleryModule.forRoot()
  ],
  providers: [StudentService,TeacherService,MemberService,UserService,AuthenticationServiceService,AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
