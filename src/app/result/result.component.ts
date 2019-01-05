/* import { Component, OnInit ,Input} from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';
import { FormControl, FormGroup, Validators, NgModel } from '@angular/forms';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {


  student : Student;
  studentId = null;
  statusCode : number;
  isValid = false;
  rolln:number;
  total:number;
  resultForm = new FormGroup({
    roll: new FormControl(0),
    fname: new FormControl(''),
    lname: new FormControl(''),
    faname: new FormControl(''),
    clas: new FormControl(''),
    hindi: new FormControl(0),
    english: new FormControl(0),
    science: new FormControl(0),
    ssc: new FormControl(0),
    maths: new FormControl(0),
    sanskrit: new FormControl(0)
  });
  @Input() rollnumber;
  processStart = false;
  constructor(private studentService: StudentService) { }

  ngOnInit() { 
  } 
  onSubmit(data: string){
    this.processStart = true;
    this.rolln = this.resultForm.get('roll').value;
    this.studentService.getResultByRoll(this.rolln)
    .subscribe(student => {
        this.studentId = this.studentId; 
        this.resultForm.setValue({roll:student.roll,fname:student.fname,lname:student.lname,faname:student.faname, clas:student.clas,
        hindi:student.hindi,english:student.english,science:student.science,ssc:student.ssc,
        maths:student.maths,sanskrit:student.sanskrit});
        this.isValid = true;
        this.rollnumber = student.roll;
        this.total = student.hindi + student.english + student.science + student.ssc + student.maths + student.sanskrit;  
    },errorCode =>  this.statusCode = errorCode);
    if(this.studentId ==null){
      this.isValid = false;
      this.processStart = true;
    }
    else{
      this.processStart = false;
    }
  }
  printDiv():void{
    let printContents, popupWin;
    printContents = document.getElementById('printableTable').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>${this.rolln}</title>
          <style>
          
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();

  
  }


}


 */