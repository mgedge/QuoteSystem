import { RowOutlet } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {    
  currentUser: any = {};

  constructor(
    private _auth: AuthService,
    private _router: Router,
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
            if(res.msg)
              this.currentUser.role = res.msg.role_id 
          });
        });
      });
  }

  ngOnInit(): void {
  }

  
}
