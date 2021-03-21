import { Component, OnInit } from '@angular/core';
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

  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'image'];
  dataSource: any;

  constructor(
    private _auth: AuthService,
  ) { 
    this._auth.getUsers().subscribe(users =>{
      this.employees = users
      this.dataSource = this.employees;

      console.log(this.employees)
    })
  }

  ngOnInit(): void {
  }

}
