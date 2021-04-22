import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/shared/services/item.service';
import { QuoteService } from 'src/app/shared/services/quote.service';
// import { QuoteCartComponent } from '../quote-cart/quote-cart.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  searchValue = '';
  itemList: any = [];
  displayedColumns: string[] = ['number', 'name', 'price', 'weight', 'image'];
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
    private _quote: QuoteService,
    // private _cart: QuoteCartComponent,
  ) { }

  ngOnInit(): void {
    this.itemList = this._quote.cartArray;
    this.loadItems();
  }


  loadItems() {
    this._item.getParts().then(items => {
      this.dataSource.data = items;
    });
  }

  sendItem(element: Item) {
    console.log(element);
    this._quote.addItemToCart(element);
    // this._cart.loadCart();
  }
}

interface Item {
  number: String
  description: String
  price: Number
  weight: Number
  pictureURL: String
  quantity: Number
}