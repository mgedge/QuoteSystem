import { RowOutlet } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {  
  //role = sessionStorage.getItem('username');

  role = 'No roles';
  
  constructor() { }

  ngOnInit(): void {
  }

  
}
