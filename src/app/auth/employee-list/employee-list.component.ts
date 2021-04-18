import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Employee } from 'src/app/auth/model/employee'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  Employee:any = [];
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
      this.Employee = users
      this.dataSource = this.Employee;
    })
  }

  // Josh: this is supposed to be the button "function"
  // to delete user, borked
  removeUser(Employee: any) {
    if(window.confirm('Are you sure?')) {
      this._auth.deleteUser(Employee._id).subscribe((res) => {
        this.loadUsers();
      });
    }
  }
}