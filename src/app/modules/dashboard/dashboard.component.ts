import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultComponent } from 'src/app/layouts/default/default.component';
import { AuthService } from './../../auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  registerForm: FormGroup;
  registerUserData: any = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    image: 'default',
    roles: [
      { role_id: '', role_title: '' }
    ]
  };

  bRole: any = [
    {name: 'Associate', checked: false},
    {name: 'Supervisor', checked: false},
    {name: 'Admin', checked: false},
    {name: 'Super', checked: false}
  ]

  error = '';

  allRoles = ['Associate', 'Supervisor', 'Admin', 'Super']

  currentUser: any = {
    image: 'default'
  };

  roles: any = [];

  constructor(
    private _auth: AuthService,
    private actRoute: ActivatedRoute,
    private _router: Router,
    private _default: DefaultComponent,
    public formBuilder: FormBuilder,

  ) {
    this.registerForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      password: [''],
      image: [''],
      roles: [ {role_id: String, role_title: String}
        // {role_id: '', role_title: ''}
      ],
    })

    //First get the userID from the token
    this._auth.getUser().subscribe((res: any) => {
      this.currentUser.userID = res.userID

      //Retrieve the current user's profile
      this._auth.getCurrentUser(this.currentUser.userID).subscribe((res: any) => {
        //Set the user to the returned user profile
        this.currentUser = res.user;

        //Next retrieve the user's roles
        if (this.currentUser.roles.length > 0) {
          this.populateRoles();
        }
      });
    });
  }

  ngOnInit(): void {
  }

  hasManyRoles(): boolean {
    return (this.roles.length > 1) ? true : false;
  }

  populateRoles() {
    for (var i = 0; i < this.currentUser.roles.length; i++) {
      this.roles[i] = this.currentUser.roles[i].role_title;
    }
    console.log(this.roles)
  }

  hasRole(): boolean {
    return (this.roles.length >= 1) ? true : false;
  }

  hasRoleID(role: any): boolean {
    for (var i = 0; i < this.roles.length; i++) {
      if (this.roles[i] === role)
        return true;
    }

    return false;
  }

  toggleRole(role: any) {
    console.log(role);

    if (this.hasRoleID(role)) {
      delete this.roles[role.role_id]
    }
    else {
      let size = this.roles.length;
      var temp;

      this.roles[size].role_title = role;

      switch (role) {
        case 'Admin':
          temp = 1;
          break;
        case 'Supervisor':
          temp = 2;
          break;
        case 'Associate':
          temp = 3;
          break;
        case 'Super':
          temp = 4;
          break;
      }

      this.roles[size].role_id = temp;
    }

    console.log(this.roles)

  }

  registerUser() {
    console.log(this.registerUserData)

    //   this._auth.registerUser(this.registerUserData)
    //     .subscribe(
    //       res => {
    //         console.log(res)

    //         //Registration complete
    //         if(res.new_user) {
    //           this.registerForm.reset() 
    //         }
    //       },
    //       err => console.log(err)
    //     )
  }
}