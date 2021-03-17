import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "./../../auth.service";
//import { userSchema } from "./../../../../server/models/user"

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  currentUser: any = {};
  sideBarOpen = true;

  constructor(
    private _router: Router,
    private _auth: AuthService,

    private actRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
