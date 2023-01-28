import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultComponent } from 'src/app/layouts/default/default.component';
import { EmployeesComponent } from 'src/app/shared/widgets/admin/employees/employees.component';
import { AuthService } from './../../auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //Form Group
  registerForm: UntypedFormGroup;
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

  error = '';

  //Form roles
  addEmployeeRoles: any = [
    { role_title: 'Associate', role_id: '1', checked: false },
    { role_title: 'Supervisor', role_id: '2', checked: false },
    { role_title: 'Admin', role_id: '3', checked: false },
    { role_title: 'Super', role_id: '4', checked: false }
  ];

  //Logged in user account
  currentUser: any = {
    image: 'default'
  };
  roles: any = [];

  constructor(
    private _auth: AuthService,
    private actRoute: ActivatedRoute,
    private _router: Router,
    private _default: DefaultComponent,
    public formBuilder: UntypedFormBuilder,
    //private employees: EmployeesComponent,
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      image: [''],
      roles: [
        // {role_id: '', role_title: ''}
      ],
    })

    //First get the userID from the token
    this._auth.getUser().then((res: any) => {
      this.currentUser.userID = res.userID

      //Retrieve the current user's profile
      this._auth.getCurrentUser(this.currentUser.userID).then((res: any) => {
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


  /**
   * @returns true or false if user has more than 1 role
   */
  hasManyRoles(): boolean {
    return (this.roles.length > 1) ? true : false;
  }

  /** Sets component roles to the current user's roles
   * 
   */
  populateRoles() {
    for (var i = 0; i < this.currentUser.roles.length; i++) {
      this.roles[i] = this.currentUser.roles[i].role_title;
    }
  }

  /** Determines if the use has any role
   * 
   * @returns true or false if user has 1 or more roles
   */
  hasRole(): boolean {
    return (this.roles.length >= 1) ? true : false;
  }

  /**
   * 
   * @param role (as string) to search in user's roles
   * @returns true or false if user has searched role
   */
  hasRoleID(role: String): boolean {
    for (var i = 0; i < this.roles.length; i++) {
      if (this.roles[i] === role)
        return true;
    }

    return false;
  }

  /**
   * 
   * @param role to be toggled
   */
  toggleRole(role: any) {
    if (role.checked) {
      role.checked = false;
    }
    else {
      role.checked = true;
    }
  }

  /**
   * Iterate through all the roles. If checked add them to the user's form submission
   */
  enableRoles() {
    var hasRole = false;
    var counter = 0;

    //Iterate through the roles
    for (var i = 0; i < this.addEmployeeRoles.length; i++) {
      //If checked, add to user's role profile
      if (this.addEmployeeRoles[i].checked) {
        //Set the index of the profile equal to the checked role
        this.registerUserData.roles[counter] = this.addEmployeeRoles[i];

        //Remove the checked property
        delete this.registerUserData.roles[counter].checked;

        //Increment next registerUser role
        counter++;

        //Check has role
        hasRole = true;
      }
    }

    //If has no role, delete that
    if(!hasRole) {
      delete this.registerUserData.roles;
    }
  }

  registerUser() {
    this.enableRoles();

    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res)

          //Registration complete
          if (res.new_user) {
            this.registerForm.reset();
          }
        },
        err => console.log(err)

      )
  }
}