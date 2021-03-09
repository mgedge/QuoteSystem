import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: String = "Shiba Inu";
  role =  Number(localStorage.getItem('role'))

  constructor() { }

  ngOnInit(): void {
  }

}
