import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  itemList: any = [
    {name: '', price: '', description: ''}
  ];

  displayedColumns: string[] = ['name', 'price', 'description'];
  dataSource: any;

  constructor(
    private _auth: AuthService,
  ) { 
    this.loadItems();
  }

  ngOnInit(): void {
  }

  loadItems() {
    this._auth.getQuotes().subscribe(items =>{
      this.itemList = items;
      this.dataSource = this.itemList;
    })
  }
}
