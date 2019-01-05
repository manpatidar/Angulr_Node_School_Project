import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { FormBuilder, FormControl, FormGroup, Validators, NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  selectedUser: User = new User(null, ' ', ' ', ' ', ' ', ' ');
  allUser: User[];
  user: User;
  statusCode: number;
  requestProcessing = false;
  userNameToDisplay = '';
  userIdToUpdate = null;
  processValidation = false;
  roleList: String[];

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.roleList = ['super', 'sub', 'Others'];
    this.userIdToUpdate = null;
    this.userForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      role: new FormControl('', Validators.required)

    });
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(
      data => this.allUser = data,
      errorCode => this.statusCode = errorCode);
  }

  onUserFormSubmit(userForm) {
    this.processValidation = true;
    if (this.userForm.invalid) {
      return;
    }

    this.preProcessConfigurations();
    let firstName = this.userForm.get('firstName').value.trim();
    let lastName = this.userForm.get('lastName').value.trim();
    let userName = this.userForm.get('userName').value.trim();
    let password = this.userForm.get('password').value.trim();
    let role = this.userForm.get('role').value.trim();
    if (this.userIdToUpdate === null) {
      let user = new User(null, firstName, lastName, userName, password, role);
      this.userService.createUser(user)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllUser();
          this.backToCreateUser();
          this.userForm.reset();
        },
        errorCode => this.statusCode = errorCode);
    }
    else {
      let user1 = new User(this.userIdToUpdate, firstName, lastName, userName, password, role);
      this.userService.updateUser(user1)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllUser();
          this.backToCreateUser();
          this.userForm.reset();
        },
        errorCode => this.statusCode = errorCode);
    }

    this.userForm.setValue({ role: '' });
    this.userNameToDisplay = userName;
  }

  loadUserToEdit(userId: string) {
    this.preProcessConfigurations();
    this.userService.getUserById(userId)
      .subscribe(user => {
        this.userIdToUpdate = userId;
        this.userForm.setValue({
          firstName: user.firstName, lastName: user.lastName, userName: user.userName, password: user.password,
          role: user.role
        });
        this.processValidation = true;
        this.requestProcessing = false;
        
      }, errorCode => this.statusCode = errorCode);
      this.userNameToDisplay = this.user.userName;
  }

  deleteUser(userId: string, userNm: string) {
    this.preProcessConfigurations();
    this.userService.deleteUserById(userId)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllUser();
        this.backToCreateUser();
      },
      errorCode => this.statusCode = errorCode);
      let localuser = localStorage.getItem("user");
      if (localuser === userNm) {
        localStorage.removeItem("user");
      }
      this.userNameToDisplay = userNm;
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateUser() {
    this.userIdToUpdate = null;
    this.userForm.reset();
    this.userForm.setValue({ role: '' });
    this.processValidation = false;
  }

  listAllUser() {
    this.userIdToUpdate = null;
  }
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get userName() { return this.userForm.get('userName'); }
  get password() { return this.userForm.get('password'); }
  get role() { return this.userForm.get('role'); }



}
