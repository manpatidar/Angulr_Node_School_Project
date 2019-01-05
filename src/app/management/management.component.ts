import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member'
import { MemberService } from '../service/member.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  allMember :Member[];
  statusCode : number;
  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.getAllTeacher();
  }

  getAllTeacher(){
    this.memberService.getAllMember().subscribe(
    data => this.allMember = data,
    errorCode => this.statusCode = errorCode);
    }
}
