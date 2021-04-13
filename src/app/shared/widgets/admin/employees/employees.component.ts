import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-widget-admin-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any = [
    {username: '', firstname: '', lastname: '', image: ''}
  ];
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'image'];
  dataSource: any;

  constructor(
    private _auth: AuthService,
  ) { 
    this.loadUsers();
  }


  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this._auth.getUsers().subscribe(users =>{
      this.employees = users
      this.dataSource = this.employees;
    })
  }

  
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
}
