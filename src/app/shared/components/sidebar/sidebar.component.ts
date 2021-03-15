import { RowOutlet } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    //private router: Router,
    private route: ActivatedRoute,
  ) { 
    let id = this.route.snapshot.paramMap.get('userID');

    this._auth.getCurrentUser(id).subscribe((res: any) => {
      //Set the user to the returned user profile
      this.currentUser = res.msg;

      //Next retrieve the user's role
      this._auth.getCurrentUserRole(this.currentUser.userID).subscribe((res: any) => { this.currentUser.role = res.msg.role_id });
    })  
  }

  ngOnInit(): void {
  }

  
}
