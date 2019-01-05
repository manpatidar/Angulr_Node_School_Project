import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';
import { first } from 'rxjs/operators';
import * as Rx from "rxjs";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  @Input() classes = ['LKG', 'UKG', 'First', 'Second',
    'Third', 'Fourth', 'Fifth', 'Sixth',
    'Seventh', 'Eighth', 'Ninth', 'Tenth'];

  available = false;
  student: Student[];
  statusCode : number;
  classN: string;
  constructor(private studentService: StudentService) { }

  ngOnInit() {

  }
  onSelect(className: string) {
    if (className != '') {
      this.studentService.loadStudentListByClass(className).
        subscribe(allStudents => { 
          this.student = allStudents ;
          //console.log('student is',this.student);
          //this.student =  allStudents.filter(x => x.clas == className)[0];
        },
          errorCode => this.statusCode = errorCode);
         
       if(this.student!=null){
          this.available = true;
          this.classN = className; 
       }   
    }
  }
}
