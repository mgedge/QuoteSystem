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
      //Retrieve the id from the url
      let id = this.actRoute.snapshot.paramMap.get('userID');
      //let userID = Number(localStorage.getItem('currentUser'));

      //Authenticate the url
      if( Number(id) !== Number(localStorage.getItem('currentUser')) ) {
        this._auth.logoutUser();
        this._router.navigate([`/login`])
      }

      //Retrieve the current user's profile
      this._auth.getCurrentUser(id).subscribe((res: any) => {
        //Set the user to the returned user profile
        this.currentUser = res.msg;

        //Next retrieve the user's role
        this._auth.getCurrentUserRole(this.currentUser.userID).subscribe((res: any) => { this.currentUser.role = res.msg.role_id });
      })  }

  ngOnInit(): void {

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
