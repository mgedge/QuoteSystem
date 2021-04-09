import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/shared/user.service';

export interface UserData {
  username: string;
  firstname: string;
  lastname: string;
  image: string;
}

const ELEMENT_DATA: UserData[] = [
  { username: '1', firstname: 'John', lastname: 'john@gmail.com', image: 'default' },
  { username: '2', firstname: 'Herry', lastname: 'herry@gmail.com', image: 'default' },
  { username: '3', firstname: 'Ann', lastname: 'ann@gmail.com', image: 'default' },
  { username: '4', firstname: 'Johnny', lastname: 'johnny@gmail.com', image: 'default' },
  { username: '5', firstname: 'Roy', lastname: 'roy@gmail.com', image: 'default' },
  { username: '6', firstname: 'Kia', lastname: 'kia@gmail.com', image: 'default' },
  { username: '7', firstname: 'Merry', lastname: 'merry@gmail.com', image: 'default' },
  { username: '8', firstname: 'William', lastname: 'william@gmail.com', image: 'default' },
  { username: '9', firstname: 'Shia', lastname: 'shia@gmail.com', image: 'default' },
  { username: '10', firstname: 'Kane', lastname: 'kane@gmail.com', image: 'default' },
  { username: '11', firstname: 'Roy', lastname: 'roy@gmail.com', image: 'default' },
  { username: '12', firstname: 'Kia', lastname: 'kia@gmail.com', image: 'default' },
  { username: '13', firstname: 'Merry', lastname: 'merry@gmail.com' , image: 'default'},
  { username: '14', firstname: 'William', lastname: 'william@gmail.com', image: 'default' },
  { username: '15', firstname: 'Shia', lastname: 'shia@gmail.com', image: 'default' },
  { username: '16', firstname: 'Kane', lastname: 'kane@gmail.com' , image: 'default'},
];


@Component({
  selector: 'app-widget-admin-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'image'];

  dataSource: any;
  employees: any = [
    {username: String, firstname: String, lastname: String, image: String}
  ];

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  // @ViewChild(MatSort, {static: true}) paginator: MatSort; 

  @ViewChild(MatSort, {static: true}) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  // @ViewChild('paginator') paginator: MatPaginator;


  // @ViewChild(MatSort, {static: true}) set sort(ms: MatSort) {
  //   this.sort = ms;
  //   this.setDataSourceAttributes();
  // }

  // @ViewChild(MatPaginator, {static: true}) set paginator(mp: MatPaginator) {
  //   this.paginator = mp;
  //   this.setDataSourceAttributes();
  // }

  constructor(
    private _auth: AuthService,
  ) { 
    this.loadUsers().then((res: any) => {
      this.employees = res;
      this.dataSource = new MatTableDataSource(this.employees);
    });
    
    console.log(this.employees)
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    // this.loadUsers();
    // this.dataSource = this.employees;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  // setDataSourceAttributes() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;

  //   if(this.paginator && this.sort) {
  //     this.applyFilter('');
  //   }
  // }

  // applyFilter(filterValue: string) {
  //   this.dataSource!.filter = filterValue.trim().toLowerCase();

  //   if(this.dataSource!.paginator) {
  //     this.dataSource!.paginator.firstPage();
  //   }
  // }

  async loadUsers() {
    await this._auth.getUsers().then(users =>{
      this.employees = users
      this.dataSource = this.employees;
      console.log(this.employees)
    });
  }

  

  // @ViewChild(MatSort) sort: MatSort;
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
}

