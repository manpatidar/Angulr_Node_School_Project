import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../model/member'
import { MemberService } from '../../service/member.service';
import { FormBuilder, FormControl, FormGroup, Validators, NgModel, NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-commitee',
  templateUrl: './admin-commitee.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminCommiteeComponent implements OnInit {


memberForm: FormGroup;
selectedMember: Member = new Member(null, ' ', ' ', ' ', 0);
allMember: Member[];
member: Member;
statusCode: number;
requestProcessing = false;
memberIdToUpdate = null;
processValidation = false;

constructor(private fb: FormBuilder, private memberService: MemberService) { }

ngOnInit(): void {
  this.memberIdToUpdate = null;
  this.memberForm = this.fb.group({

    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    add: new FormControl('', Validators.required),
    phone: new FormControl(null, [(Validators.required, Validators.maxLength(10))]),
  });
  this.getAllMember();
}

getAllMember() {
  this.memberService.getAllMember().subscribe(
    data => this.allMember = data,
    errorCode => this.statusCode = errorCode);
}

onMemberFormSubmit(memberForm) {
  this.processValidation = true;
  if (this.memberForm.invalid) {
    return;
  }
  this.preProcessConfigurations();
  let fname = this.memberForm.get('fname').value.trim();
  let lname = this.memberForm.get('lname').value.trim();
  let add   = this.memberForm.get('add').value.trim();
  let phone = this.memberForm.get('phone').value;
  if (this.memberIdToUpdate === null) {
    let member = new Member(null, fname, lname, add, phone);
    this.memberService.createMember(member)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllMember();
        this.backToCreateMember();
      },
      errorCode => this.statusCode = errorCode);
  }
  else {
    let member1 = new Member(this.memberIdToUpdate, fname, lname, add, phone);
    this.memberService.updateMember(member1)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllMember();
        this.backToCreateMember();
      },
      errorCode => this.statusCode = errorCode);
  }
}

loadMemberToEdit(memberId: string) {
  this.preProcessConfigurations();
  this.memberService.getMemberById(memberId)
    .subscribe(member => {
      this.memberIdToUpdate = memberId;
      this.memberForm.setValue({ fname: member.fname, lname: member.lname, add: member.add, phone: member.phone });
      this.processValidation = true;
      this.requestProcessing = false;
    }, errorCode => this.statusCode = errorCode);
}

deleteMember(memberId: string) {
  this.preProcessConfigurations();
  this.memberService.deleteMemberById(memberId)
    .subscribe(successCode => {
      this.statusCode = successCode;
      this.getAllMember();
      this.backToCreateMember();
    },
    errorCode => this.statusCode = errorCode);
}
preProcessConfigurations() {
  this.statusCode = null;
  this.requestProcessing = true;
}
backToCreateMember() {
  this.memberIdToUpdate = null;
  this.memberForm.reset();
  this.processValidation = false;
}

get fname() { return this.memberForm.get('fname'); }
get lname() { return this.memberForm.get('lname'); }
get add()   { return this.memberForm.get('add');   }
get phone() { return this.memberForm.get('phone'); }

}
