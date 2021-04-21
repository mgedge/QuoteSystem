import { Component, OnInit, ViewChild } from '@angular/core';

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
  //Used to filter
  searchValue = '';
  
  //CHANGE to match the  to filter
  employees: any = [ ];

  //CHANGE the displayed columns to match the matColumnDef
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

  //CHANGE modify this function to retrieve your data
  //Retrieve the users from the db
  loadUsers() {
    this._auth.getUsers().subscribe(users =>{
      this.dataSource.data = users
    })
  }

  //This function is used to filter results. No need to modify
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

//CHANGE modify this interface to resemble the properties you require
export interface Element {
    username: String
    firstname: String
    lastname: String
    image: String
}
