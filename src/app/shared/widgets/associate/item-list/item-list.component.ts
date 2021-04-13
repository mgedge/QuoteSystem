import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/services/item.service';

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private _item: ItemService,
  ) { 
    this.loadItems();
  }

  ngOnInit(): void {
  }

  loadItems() {
    this._item.getItems().subscribe(items =>{
      this.itemList = items;
      this.dataSource = this.itemList;
    })
  }
}
