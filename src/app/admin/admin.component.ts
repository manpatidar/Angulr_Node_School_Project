import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { User } from '../model/user';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  stdSection = false;
  tchSection = false;
  commSection = false;
  isUpload = false;

  @Input()user: String;

  constructor(private route: ActivatedRoute, private router: Router,private _service:AuthenticationServiceService) { }
  
  ngOnInit() { 
    //this._service.logout(); 
  }

  logout() {
    this._service.logout()
    .subscribe(res=> {
      localStorage.removeItem('access_token');
      localStorage.removeItem('current_user');
    });
  }

  changeSection1() {
    this.stdSection = true;
    this.tchSection = false;
    this.commSection = false;
    this.isUpload = true;
  }
  changeSection2() {
    this.stdSection = false;
    this.tchSection = true;
    this.commSection = false;
    this.isUpload = false;
  }
  changeSection3() {
    this.stdSection = false;
    this.tchSection = false;
    this.commSection = true;
    this.isUpload = false;
  }


}

