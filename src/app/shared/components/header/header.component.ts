import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() _toggleSideBar: EventEmitter<any> = new EventEmitter()
  
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  roles: any = [];

  currentUser: any = {};

  constructor(
    private _auth: AuthService,
    private router: Router,
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
          this.populateRoles();
        }
      });
    });
  }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this._toggleSideBar.emit();
  }

  logout() {
    this._auth.logoutUser();
  }

  populateRoles() {
    for (var i = 0; i < this.currentUser.roles.length; i++) {
      this.roles[i] = this.currentUser.roles[i].role_title;
    }
  }

  hasRole(): boolean {
    return (this.roles.length >= 1) ? true : false;
  }

  hasRoleID(role: any): boolean {
    for (var i = 0; i < this.roles.length; i++) {
      if (this.roles[i] === role)
        return true;
    }

    return false;
  }
}
