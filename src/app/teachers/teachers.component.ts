import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from '../model/teacher'
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

allTeacher : Teacher[];
statusCode : number;
  constructor(private teacherService: TeacherService) { }

  ngOnInit() { 
    this.getAllTeacher();
  }

  getAllTeacher(){
    this.teacherService.getAllTeacher().subscribe(
    data => this.allTeacher = data,
    errorCode => this.statusCode = errorCode);
    }

}
