import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  registerUserData:any = {};

  constructor(
    private _auth: AuthService,
    private _router: Router,
    public formBuilder: FormBuilder
  ) { 
    this.registerForm = this.formBuilder.group({
      firstname: [''], 
      lastname: [''],
      username: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res)

          //Registration complete
          if(res.new_user) {
            this.registerForm.reset() 
            this._router.navigate(['/login'])
          }
          //localStorage.setItem('token', res.token)
        },
        err => console.log(err)
      )
  }

}
