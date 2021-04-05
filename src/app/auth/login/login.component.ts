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

  //Function to handle logging in
  loginUser() {
    this._auth.loginUser(this.loginUserData)
    // .subscribe(
    //   res => {
    //     localStorage.setItem('token', res.token)
    //     this._router.navigate(['/#'])
    //   }, 
    //   err => console.log(err)
    // );
  }

  //Handle the enter button
  submit(event: any) {
    if( event.keyCode == 13) {
      this.loginUser();
    }
  }
}