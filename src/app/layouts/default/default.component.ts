import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./../../auth.service";
//import { userSchema } from "./../../../../server/models/user"

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  currentUser: any;
  sideBarOpen = true;

  constructor(
    private router: Router,
    private _auth: AuthService
  ) { 
    this.currentUser = this._auth.getCurrentUser
  }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
