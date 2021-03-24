import { MediaMatcher } from '@angular/cdk/layout';
import { RowOutlet } from '@angular/cdk/table';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  
  currentUser: any = {};
  priorityRole: any = {
    title: 'No role',
    priority: 100
  }

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private route: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
  ) {
    //Get size to show links
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    //First get the userID from the token
    this._auth.getUser().subscribe((res: any) => {
      this.currentUser.userID = res.userID

      //Retrieve the current user's profile
      this._auth.getCurrentUser(this.currentUser.userID).subscribe((res: any) => {
        //Set the user to the returned user profile
        this.currentUser = res.user;

        //Next retrieve the user's roles
        if (this.currentUser.roles.length > 0) {
          this.setPriorityRole();
        }
      });
    });
  }

  ngOnInit(): void {
  }

  setPriorityRole() {
    for (var i = 0; i < this.currentUser.roles.length; i++) {
      let id = this.currentUser.roles[i].role_id;

      //If the role id is lower than the current priority, set it
      if ((id <= this.priorityRole.priority) || (id === '10')) {
        this.priorityRole.title = this.currentUser.roles[i].role_title;
        this.priorityRole.priority = this.currentUser.roles[i].role_id;
      }5
    }
  }


  toLower(link: any): any {
    String(link);
    return link.toLowerCase();
  }

  isSmall(): boolean {
    return false;
  }
}