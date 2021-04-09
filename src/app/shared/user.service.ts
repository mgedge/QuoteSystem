import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  //Logged in user account
  currentUser: any = {};
  priorityRole: any = {
    title: 'No role',
    priority: 100
  }

  userSet = false;

  constructor(
    private _auth: AuthService,

  ) {
    //this.setUser();
  }

  ngOnInit(): void {

  }

  public checkLoaded() {
    return new Promise((resolve, reject) => {
      if(this.userSet) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    })
  }

  private async setUser() {
    console.log("Serv: Setting user")

    //First get the userID from the token
    await this._auth.getUser().then(async (res: any) => {
      this.currentUser.userID = res.userID

      //Retrieve the current user's profile
      await this._auth.getCurrentUser(this.currentUser.userID).then((res: any) => {
        //Set the user to the returned user profile
        this.currentUser = res.user;
        this.userSet = true;
        console.log("Serv: User set")
        console.log(this.currentUser)
      });
    });

  }

  public async getUser() {
    console.log(this.currentUser.length )
    console.log(this.currentUser == undefined)
    if (this.currentUser == null || this.currentUser == undefined || this.currentUser.length == undefined) {
      console.log("User is undefined, must be set");
      await this.setUser();
    }

    return this.currentUser;
  }

  setPriorityRole() {
    for (var i = 0; i < this.currentUser.roles.length; i++) {
      let id = this.currentUser.roles[i].role_id;

      //If the role id is lower than the current priority, set it
      if ((id <= this.priorityRole.priority) || (id === '10')) {
        this.priorityRole.title = this.currentUser.roles[i].role_title;
        this.priorityRole.priority = this.currentUser.roles[i].role_id;
      }
    }
  }
}
