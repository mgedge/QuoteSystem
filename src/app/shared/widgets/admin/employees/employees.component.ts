import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-widget-admin-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any = [
    {username: '', firstname: '', lastname: '', image: ''}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'image'];
  dataSource: any;

  constructor(
    private _auth: AuthService,
  ) { 
    this.loadUsers();
    this.dataSource = new MatTableDataSource(this.employees);
  }


  ngOnInit(): void {
    // this.loadUsers();
  }

  loadUsers() {
    this._auth.getUsers().then(users =>{
      this.employees = users
      this.dataSource = this.employees;
    })
  }

  // @ViewChild(MatSort) sort: MatSort;
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
}
