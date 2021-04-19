import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  User:any = [];
  dataSource: any;

  constructor(
    private _auth: AuthService,
  ) {
    this.loadUsers();
   }

  ngOnInit(): void {
  }

  // Josh: Loads users into the table
  loadUsers() {
    this._auth.getUsers().subscribe(users =>{
      this.User = users
      this.dataSource = this.User;
    })
  }

  // Josh: Delete function, deletes users
  removeUser(_id: string) {
    // console.log('HTML grabbed (' + _id + ') and sent to removeUser. Sending now to deleteUser')
    if(window.confirm('Are you sure?')) {
      this._auth.deleteUser(_id).subscribe((res) => {
        // console.log('Finshed deletion of (' + _id + '). Reloading users')
        this.loadUsers();
      });
    }
  }

}
