import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';
import { QuoteService } from 'src/app/shared/services/quote.service';

@Component({
  selector: 'app-quote-cart',
  templateUrl: './quote-cart.component.html',
  styleUrls: ['./quote-cart.component.css']
})
export class QuoteCartComponent implements OnInit {
  // subscription: Subscription | undefined;
  employee: any;

  searchValue = '';
  itemList: any = [{}];
  displayedColumns: string[] = ['number', 'name', 'price', 'weight', 'image', 'quantity', 'delete'];
  dataSource = new MatTableDataSource<any>(this.itemList);

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
    private _quote: QuoteService,
    private _auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadCart();

  }

  loadCart() {
    this._quote.cartObservable.subscribe((cart: any) => {
      console.log(cart);
      this.dataSource.data = cart;
    });
  }
}

export interface Item {
  number: String
  description: String
  price: Number
  weight: Number
  pictureURL: String
  quantity: Number
}