import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  loginUserData:any = {};
  constructor(
    private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  initForm() {
    // this.formGroup = new FormGroup({
    //   username: new FormControl('',[Validators.required]),
    //   password: new FormControl('',[Validators.required])
    // })
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/#'])
          /*
          if(res.success) {
            console.log(res)
            localStorage.setItem('token', res.token)
            this._router.navigate(['/special'])
          }
          else {
            console.log('Failed!')
          }
          */
        },
        err => console.log(err)
      )
  }
}