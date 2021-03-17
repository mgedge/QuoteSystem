import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {
  stringVar = 'Hello people'
  database: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
