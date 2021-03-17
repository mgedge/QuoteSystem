import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() _toggleSideBar: EventEmitter<any> = new EventEmitter()

  currentUser: any = {};

  constructor(
    private _auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    //First get the userID from the token
    this._auth.getUser().subscribe((res: any) => {
      this.currentUser.userID = res.msg;

      //Retrieve the current user's profile
      this._auth.getCurrentUser(this.currentUser.userID).subscribe((res: any) => {
        //Set the user to the returned user profile
        this.currentUser = res.msg;

        //Next retrieve the user's role
        this._auth.getCurrentUserRole(this.currentUser.userID).subscribe((res: any) => {
          if (res.msg)
            this.currentUser.role = res.msg.role_id
        });
      });
    });
  }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this._toggleSideBar.emit();
  }

  logout() {
    this._auth.logoutUser();
  }

  get isAdmin(): boolean {
    //Retrieve the user from storage
    //let role = localStorage.getItem('role');
    let role = this.currentUser.role;

    //console.log("header.ts - isAdmin : " + role);

    //Convert the string to a number 
    let roleVar = Number(role);

    // *** DEBUG *** //
    //console.log("FROM USER: " + user)
    //console.log("ROLE     : " + localStorage.getItem('role')  )

    //Check the role
    if (this._auth.loggedIn) {
      let hasRole = (roleVar == 1);
      //console.log("roleVar: " + roleVar + " " + hasRole)
      return hasRole;
    }

    //Assume access is denied
    return false;
  }

  get isSales(): boolean {
    //Retrieve the user from storage
    //let role = localStorage.getItem('role');
    let role = this.currentUser.role;

    //Convert the string to a number 
    let roleVar = Number(role);

    // *** DEBUG *** //
    //console.log("FROM USER: " + user)
    //console.log("ROLE     : " + localStorage.getItem('role')  )

    //Check the role
    if (this._auth.loggedIn) {
      let hasRole = (roleVar == 2);
      return hasRole;
    }

    //Assume access is denied
    return false;
  }

  get isSupervisor(): boolean {
    //Retrieve the user from storage
    let role = this.currentUser.role;
    //let role = localStorage.getItem('role');

    //Convert the string to a number 
    let roleVar = Number(role);

    // *** DEBUG *** //
    //console.log("FROM USER: " + user)
    //console.log("ROLE     : " + localStorage.getItem('role')  )

    //Check the role
    if (this._auth.loggedIn) {
      let hasRole = (roleVar == 3);
      return hasRole;
    }

    //Assume access is denied
    return false;
  }
}
