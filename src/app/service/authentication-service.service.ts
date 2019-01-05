import { Injectable, Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationServiceService {

  constructor(private router: Router, private http: HttpClient) { }
  token: string;

  ngOnInit() { }

  logout() {
    return this.http.get<any>('http://localhost:3000/users/logout');
  }

  login(userName: string, password: string) {
    debugger;

    return this.http.post<any>('http://localhost:3000/users/login', { userName, password })
      .pipe(map((res: any) => {
        this.token = res.data;
        localStorage.setItem('access_token', this.token);
        localStorage.setItem('current_user', userName);
      }));

  }
  checkCredentials() {
    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['returnUrl']);
    }
  }
}
