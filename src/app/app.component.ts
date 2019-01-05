import { Component, Input, Output, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Teacher } from './model/teacher';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from './service/authentication-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  images = ['A.jpg', 'B.jpg',  'C.jpg', 'D.jpg',  'E.jpg', 'F.jpg',  'G.jpg'  ];

  @Input() user: String;
  isUser = false;

  constructor(private router: Router, private _serive: AuthenticationServiceService) { }
  
  ngOnInit() {
    
    this.user = localStorage.getItem("currentUser");
    if (typeof this.user === undefined) {
      this.isUser = false;
    }
    else {
      this.isUser = true;
    }
  }
 
  login() {
    this.router.navigate['/login'];
  }
  logout() {
    this._serive.checkCredentials();
  }

}
