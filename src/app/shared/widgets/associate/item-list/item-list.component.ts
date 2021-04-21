import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator) set paginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private _item: ItemService,
  ) { 
    
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this._item.getItems().subscribe(items =>{
      this.itemList = items;
      this.dataSource = this.itemList;
    })
  }
}
