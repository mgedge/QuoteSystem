import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  searchValue = '';
  itemList: any = [];
  displayedColumns: string[] = ['name', 'price', 'description'];
  dataSource = new MatTableDataSource<Element>(this.itemList);

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private _item: ItemService,
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this._item.getItems().subscribe(items =>{
      this.dataSource = items;
    })
  }
}

interface Element {
  name: String
  description: String
  price: number
}