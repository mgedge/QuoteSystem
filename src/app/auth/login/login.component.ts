import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formGroup!: FormGroup;
  error = ''

  loginUserData:any = {};

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private formBuilder: FormBuilder) {    
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  loginUser() {
    const loginData = this.loginForm.value;

    // if(this.loginForm.invalid) {
    //   return;
    // }

    this._auth.loginUser(this.loginUserData);
  }
}