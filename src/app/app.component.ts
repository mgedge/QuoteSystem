import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quote System';
  //currentUser: any;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private _auth: AuthService
  ) {
    //this.currentUser = this._auth.currentUser //Does this work?
  }

  logout() {
    this._auth.logoutUser();
  }

  get isAdmin(): boolean { 
    //Retrieve the user from storage
    //let role = localStorage.getItem('role');
    let role = this._auth.getCurrentRole();

    //Convert the string to a number 
    let roleVar = Number(role);

    // *** DEBUG *** //
    //console.log("FROM USER: " + user)
    //console.log("ROLE     : " + localStorage.getItem('role')  )

    //Check the role
    if(this._auth.loggedIn) {
      let hasRole = (roleVar == 1);
      return hasRole;
    }

    //Assume access is denied
    return false;
  }

  get isSales(): boolean {
    //Retrieve the user from storage
    //let role = localStorage.getItem('role');
    let role = this._auth.getCurrentRole();

    //Convert the string to a number 
    let roleVar = Number(role);

    // *** DEBUG *** //
    //console.log("FROM USER: " + user)
    //console.log("ROLE     : " + localStorage.getItem('role')  )

    //Check the role
    if(this._auth.loggedIn) {
      let hasRole = (roleVar == 2);
      return hasRole;
    }

    //Assume access is denied
    return false;  
  }

  get isSupervisor(): boolean {
    //Retrieve the user from storage
    //let role = localStorage.getItem('role');
    let role = this._auth.getCurrentRole();

    //Convert the string to a number 
    let roleVar = Number(role);

    // *** DEBUG *** //
    //console.log("FROM USER: " + user)
    //console.log("ROLE     : " + localStorage.getItem('role')  )

    //Check the role
    if(this._auth.loggedIn) {
      let hasRole = (roleVar == 3);
      return hasRole;
    }

    //Assume access is denied
    return false;  
  }
}
