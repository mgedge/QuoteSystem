import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultComponent } from 'src/app/layouts/default/default.component';
import { AuthService } from './../../auth.service'
import { currentUser } from './../../currentUser'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = {
    image: 'default'
  };

  constructor(
    private _auth: AuthService,
    private actRoute: ActivatedRoute,
    private _router: Router,
    private _default: DefaultComponent,
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

  hasRole(): boolean {
    if (Number(this.currentUser.role) !== 0) {
      return true;
    }

    return false;
  }

  hasRoleID(role: number): boolean {
    if (Number(this.currentUser.role) === Number(role)) {
      return true;
    }

    return false;
  }
}