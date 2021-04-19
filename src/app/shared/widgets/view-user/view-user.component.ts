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

  loadUsers() {
    this._auth.getUsers().subscribe(users =>{
      this.User = users
      this.dataSource = this.User;
    })
  }
  
  removeUser(_id: string) {
    if(window.confirm('Are you sure?')) {
      this._auth.deleteUser(_id).subscribe((res) => {
        this.loadUsers();
      });
    }
  }

}
