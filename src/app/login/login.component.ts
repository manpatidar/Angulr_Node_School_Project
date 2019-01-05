import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  myForm: FormGroup;
  errorFlag = false;
  user: User;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  @Input() errorMessage: String;
  constructor(fb: FormBuilder, private router: Router, private route: ActivatedRoute,
              private _service: AuthenticationServiceService) {
              this.myForm = fb.group({
                'userName': ['', Validators.required],
                'password': ['', Validators.required]
              });
  }
  
  ngOnInit() {
    if (localStorage.getItem('access_token')) {
                  this._service.logout();
              }
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
   }


  onSubmit(value: String) {
    
    this.userName = this.myForm.get('userName').value;
    this.password = this.myForm.get('password').value;
    this.errorMessage = '';
    if(typeof this.userName === 'undefined' || typeof this.password === 'undefined'){
      this.errorFlag = true;
      this.errorMessage = 'user name and password can not be blank';
    }
    else  {
      this._service.login(this.userName, this.password)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(['/admin']);
          },
          error => {
              this.error = error;
              this.loading = false;
          });
    }
  }
}
