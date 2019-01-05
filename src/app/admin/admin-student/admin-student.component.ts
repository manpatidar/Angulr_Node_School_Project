import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../model/student'
import { StudentService } from '../../service/student.service';
import { FormBuilder, FormControl, FormGroup, Validators, NgModel, NgForm } from '@angular/forms';
import * as XLSX from 'ts-xlsx';
@Component({

  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminStudentComponent implements OnInit {

  classes = ['LKG', 'UKG', 'First', 'Second',
    'Third', 'Fourth', 'Fifth', 'Sixth',
    'Seventh', 'Eighth', 'Ningth', 'Tenth'];
  studentForm: FormGroup;
  selectedStudent: Student = new Student(null, 0, ' ', ' ', ' ', ' ', ' ', ' ',' ',0, 0);
  allStudents: Student[];
  student: Student;
  statusCode: number;
  requestProcessing = false;
  studentIdToUpdate = null;
  processValidation = false;
  isAdd = false;
  isEdit = false;
  isDelete = false;
  showList = false;
  genderList: String[];
  student1: Student[];
  data: any;
  arrayBuffer: any;
  file: File;
  isFileSelected = false;
  statusMessage: string;
  errFlg = false;
  constructor(private fb: FormBuilder, private studentService: StudentService) { }
  incomingfile(event) {
    this.file = event.target.files[0];
    this.isFileSelected = true;
    console.log(event.target.value('fileName'));
  }
  ngOnInit(): void {
    this.genderList = ['Male', 'Female', 'Others'];
    this.studentIdToUpdate = null;
    this.studentForm = this.fb.group({ 
      roll: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10000000)]),
      fname: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(10)]),
      lname: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(10)]),
      faname: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
      mname: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
      gender: new FormControl('', Validators.required),
      clas: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      aadhar: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    })
    //this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe(
      data => this.allStudents = data,
      errorCode => this.statusCode = errorCode);
  }

  onStudentFormSubmit(studentForm) {
    this.processValidation = true;
    if (this.studentForm.invalid) {
      return;
    }
    this.preProcessConfigurations();
    let roll = this.studentForm.get('roll').value;
    let fname = this.studentForm.get('fname').value.trim();
    let lname = this.studentForm.get('lname').value.trim();
    let faname = this.studentForm.get('faname').value.trim();
    let mname = this.studentForm.get('mname').value.trim();
    let clas = this.studentForm.get('clas').value.trim();
    let gender = this.studentForm.get('gender').value;
    let address = this.studentForm.get('address').value.trim();
    let aadhar = this.studentForm.get('aadhar').value.trim();
    let phone = this.studentForm.get('phone').value;

    if (this.studentIdToUpdate === null) {
      let student = new Student(null, roll, fname, lname, faname,mname, gender,clas, address,aadhar, phone);
      this.studentService.createStudent(student)
        .subscribe(res => {
          this.statusMessage = res.error.Message;
          this.errFlg = true;
          this.getAllStudents();
          this.backToCreateStudent();
        },
        res => {
          this.errFlg = true;
          this.statusMessage = res.error.Message});
    }
    else {
      let student1 = new Student(this.studentIdToUpdate, roll, fname, lname, faname,mname, gender,clas, address, aadhar, phone);
      this.studentService.updateStudent(student1)
        .subscribe(res => {
          this.statusMessage = res.error.Message;
          this.errFlg = true;
          this.getAllStudents();
          this.backToCreateStudent();
        },
        res => {
          this.errFlg = true;
          this.statusMessage = res.error.Message});
    }
  }

  loadStudentToEdit(studentId: string) {
    this.preProcessConfigurations();
    this.studentService.getStudentById(studentId)
      .subscribe(student => {
        this.studentIdToUpdate = studentId;
        this.studentForm.setValue({
          roll: student.roll, fname: student.fname, lname: student.lname, faname: student.faname, clas: student.clas, gender: student.gender,
          mname: student.mname, address: student.address, aadhar: student.aadhar, phone: student.phone
        });
        this.processValidation = true;
        this.isDelete = false;
        this.isAdd = false;
        this.isEdit = true;
        this.requestProcessing = false;
        console.log(student.roll, student.fname);
      }, errorCode => this.statusCode = errorCode);
  }

  deleteStudent(studentId: string) {
    this.preProcessConfigurations();
    this.studentService.deleteStudentById(studentId)
      .subscribe(res => {
        this.isDelete = true;
        this.isAdd = false;
        this.showList = false;
        this.statusMessage = res.error.Message;
        this.getAllStudents();
        this.backToCreateStudent();
      },
      res => {
        this.errFlg = true;
        this.statusMessage = res.error.Message});
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateStudent() {
    this.studentIdToUpdate = null;
    this.processValidation = false;
    this.isDelete = false;
    this.isEdit = false;
    this.isAdd = false;
  }
  changeStatus() {
    this.studentIdToUpdate = null;
    this.isAdd = true;
    this.showList = false;
    this.isEdit = false;
    this.studentForm.reset();
  }
  onSelect(studentId: string) {
    this.studentIdToUpdate = this.loadStudentToEdit(studentId);
    if (this.studentIdToUpdate != ' ') {
      this.isAdd = false;
      this.showList = false;
    }
    else {
      this.isEdit = false;
      this.isAdd = false;
    }
  }
  listAllStudent() {
    this.getAllStudents();
    this.studentIdToUpdate = null;
    this.showList = true;
    this.isAdd = false;
    this.isEdit = false;
  }
  deleteAllStudent(){
    this.preProcessConfigurations();
    this.studentService.deleteAllStudent()
      .subscribe(res => {
        this.isDelete = true;
        this.isAdd = true;
        this.showList = true;
        this.statusMessage = res.error.Message;
        this.getAllStudents();
        this.backToCreateStudent();
      },
      res => {
        this.errFlg = true;
        this.statusMessage = res.error.Message});
  }
  get roll() { return this.studentForm.get('roll'); }
  get fname() { return this.studentForm.get('fname'); }
  get lname() { return this.studentForm.get('lname'); }
  get faname() { return this.studentForm.get('faname'); }
  get mname() { return this.studentForm.get('mname'); }
  get clas() { return this.studentForm.get('clas'); }
  get gender() { return this.studentForm.get('gender'); }
  get address() { return this.studentForm.get('address'); }
  get aadhar() { return this.studentForm.get('aadhar'); }
  get phone() { return this.studentForm.get('phone'); }


  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i){
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true })

      for(let std of this.data){
        let student1 = new Student(null, std.roll, std.fname, std.lname, std.faname,std.mname, std.clas, std.gender, std.address, std.aadhar, std.phone);
        this.studentService.createStudent(student1)
          .subscribe(successCode => {
            this.statusCode = successCode;
          },
          errorCode => this.statusCode = errorCode);
         
      }
    }
    fileReader.readAsArrayBuffer(this.file);
    this.getAllStudents();
    this.isEdit = false;
    this.isAdd = false;
    this.showList = false;
  }
}
