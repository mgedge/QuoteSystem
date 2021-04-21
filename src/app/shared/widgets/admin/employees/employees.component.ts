import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-widget-admin-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any = [
    // {username: '', firstname: '', lastname: '', image: ''}
  ];
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'image'];
  dataSource = new MatTableDataSource<Element>(this.employees);

  constructor(
    private _auth: AuthService,
  ) { }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  //Retrieve the users from the db
  loadUsers() {
    this._auth.getUsers().subscribe(users =>{
      this.dataSource.data = users
    })
  }
}


export interface Element {
    username: String
    firstname: String
    lastname: String
    image: String
}
