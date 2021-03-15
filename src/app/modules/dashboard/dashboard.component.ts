import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../auth.service'
import { currentUser } from './../../currentUser'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // currentUser: Object = {
  // };

  currentUser: any = {};

  // user: any = {
  //   userID: null, 
  //   username: '',
  //   firstname: '', 
  //   lastname: ''
  // };
  //myUser: Object = {};
  //username: String = "Shiba Inu";
  //role =  Number(localStorage.getItem('role'))

  //role = Number(this._auth.getCurrentRole());

  constructor(        
      private _auth: AuthService,
      private actRoute: ActivatedRoute,
    ) { 
      let id = this.actRoute.snapshot.paramMap.get('userID');
      //let id = localStorage.getItem('currentUser');
      this._auth.getCurrentUser(id).subscribe((res: any) => {
        //Set the user to the returned user profile
        this.currentUser = res.msg;

        //Next retrieve the user's role
        this._auth.getCurrentUserRole(this.currentUser.userID).subscribe((res: any) => { this.currentUser.role = res.msg.role_id });
      })
    }

  ngOnInit(): void {
  }

  hasRole(): boolean {
    if(this._auth.currentUserRole !== 0) {
      return true;
    }

    return false;
  }
}