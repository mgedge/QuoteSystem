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

  currentUser: any;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.currentUser = this._auth.getCurrentUser()
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
    let role = localStorage.getItem('role');

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
    let role = localStorage.getItem('role');

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
    let role = localStorage.getItem('role');

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
