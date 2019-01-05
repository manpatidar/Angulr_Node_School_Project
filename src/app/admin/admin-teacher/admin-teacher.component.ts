import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from '../../model/teacher'
import { TeacherService } from '../../service/teacher.service';
import { FormBuilder, FormControl, FormGroup, Validators, NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminTeacherComponent implements OnInit {

  quali = ['10th', '12th', 'BA', 'BCom',
    'MA', 'MCom', 'B.sc', 'M.sc',
    'BE', 'ME', 'BCA', 'MCA', 'B.Ed', 'M.Ed', 'D.Ed'];
  teacherForm: FormGroup;
  selectedTeacher: Teacher = new Teacher(null, ' ', ' ', ' ', ' ');
  allTeacher: Teacher[];
  teacher: Teacher;
  statusCode: number;
  requestProcessing = false;
  teacherIdToUpdate = null;
  processValidation = false;

  constructor(private fb: FormBuilder, private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.teacherIdToUpdate = null;
    this.teacherForm = this.fb.group({

      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      post: new FormControl('', Validators.required),
      qual: new FormControl('', Validators.required),
    });
    this.getAllTeacher();
  }

  getAllTeacher() {
    this.teacherService.getAllTeacher().subscribe(
      data => this.allTeacher = data,
      errorCode => this.statusCode = errorCode);
  }

  onTeacherFormSubmit(teacherForm) {
    this.processValidation = true;
    if (this.teacherForm.invalid) {
      return;
    }
    this.preProcessConfigurations();
    let fname = this.teacherForm.get('fname').value.trim();
    let lname = this.teacherForm.get('lname').value.trim();
    let post = this.teacherForm.get('post').value.trim();
    let qual = this.teacherForm.get('qual').value.trim();
    if (this.teacherIdToUpdate === null) {
      let teacher = new Teacher(null, fname, lname, post, qual);
      this.teacherService.createTeacher(teacher)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllTeacher();
          this.backToCreateTeacher();
        },
        errorCode => this.statusCode = errorCode);
    }
    else {
      let teacher1 = new Teacher(this.teacherIdToUpdate, fname, lname, post, qual);
      this.teacherService.updateTeacher(teacher1)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllTeacher();
          this.backToCreateTeacher();
        },
        errorCode => this.statusCode = errorCode);
    }
  }

  loadTeacherToEdit(teacherId: string) {
    this.preProcessConfigurations();
    this.teacherService.getTeacherById(teacherId)
      .subscribe(teacher => {
        this.teacherIdToUpdate = teacherId;
        this.teacherForm.setValue({ fname: teacher.fname, lname: teacher.lname, post: teacher.post, qual: teacher.qual });
        this.processValidation = true;
        this.requestProcessing = false;
      }, errorCode => this.statusCode = errorCode);
  }

  deleteTeacher(teacherId: string) {
    this.preProcessConfigurations();
    this.teacherService.deleteTeacherById(teacherId)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllTeacher();
        this.backToCreateTeacher();
      },
      errorCode => this.statusCode = errorCode);
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateTeacher() {
    this.teacherIdToUpdate = null;
    this.teacherForm.reset();
    this.processValidation = false;
  }

  get fname() { return this.teacherForm.get('fname'); }
  get lname() { return this.teacherForm.get('lname'); }
  get post() { return this.teacherForm.get('post'); }
  get qual() { return this.teacherForm.get('qual'); }

}
 