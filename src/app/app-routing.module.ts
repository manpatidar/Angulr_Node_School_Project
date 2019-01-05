import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent} from './about/about.component';
import { FeeStructureComponent} from './fee-structure/fee-structure.component';
import { ManagementComponent} from './management/management.component';
import { ContactComponent} from './contact/contact.component';
import { StudentListComponent} from './student-list/student-list.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProgramComponent } from './program/program.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SchoolComponent } from './school/school.component';
import { LoginComponent } from './login/login.component';
//import { ResultComponent } from './result/result.component';
import { AdminComponent } from './admin/admin.component';
import { AdminStudentComponent } from './admin/admin-student/admin-student.component';
import { AdminTeacherComponent } from './admin/admin-teacher/admin-teacher.component';
import { AdminCommiteeComponent } from './admin/admin-commitee/admin-commitee.component';
import { DepartmentComponent } from './department/department.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '*', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'feestructure', component: FeeStructureComponent},
  { path: 'management' , component: ManagementComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'studentlist', component: StudentListComponent},
  { path: 'gallery', component: GalleryComponent},
  { path: 'program', component: ProgramComponent},
  { path: 'teacher', component: TeachersComponent},
  { path: 'school', component: SchoolComponent},
  { path: 'loginSchoolComponent', component:LoginComponent},
 // { path: 'result', component:ResultComponent},
  { path: 'admin', component:AdminComponent, canActivate: [AuthGuard]},
  { path: 'adminStudent', component:AdminStudentComponent, canActivate: [AuthGuard]},
  { path: 'adminTeacher', component: AdminTeacherComponent, canActivate: [AuthGuard]},
  { path: 'adminCommitee', component: AdminCommiteeComponent, canActivate: [AuthGuard]},
  { path: 'department', component: DepartmentComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpClientModule, HttpModule],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
