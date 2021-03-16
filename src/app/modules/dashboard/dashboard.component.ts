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
      // this.currentUser = _default.currentUser;
      // console.log(this.currentUser)
      // console.log(_default.currentUser);

      //First get the userID from the token
      this._auth.getUser().subscribe((res: any) => {
        this.currentUser.userID = res.msg;

        console.log("API CALL:")
        console.log(res.msg)

        console.log("USER ID:")
        console.log(this.currentUser.userID)

        //Retrieve the id from the url
        let id = this.actRoute.snapshot.paramMap.get('userID');
        let userID = Number(localStorage.getItem('currentUser'));

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
          this._auth.getCurrentUserRole(this.currentUser.userID).subscribe((res: any) => { 
            this.currentUser.role = res.msg.role_id 
          });
        });
      });
    }

  ngOnInit(): void {
  }

  hasRole(): boolean {
    if(Number(this.currentUser.role) !== 0) {
      return true;
    }

    return false;
  }

  hasRoleID(role: number): boolean {
    if(Number(this.currentUser.role) === Number(role)) {
      return true;
    }

    return false;
  }
}