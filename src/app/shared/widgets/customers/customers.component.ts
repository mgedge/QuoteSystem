import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../../services/customer.service';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  searchValue = '';
  itemList: any = [];
  displayedColumns: string[] = ['id', 'name', 'city', 'street', 'contact'];
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
    private _customer: CustomerService,
    private _quote: QuoteService,
    ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }


  loadCustomers() {
    this._customer.getCustomers().then(items => {
      this.dataSource.data = items;
    });
  }

  sendItem(element: any) {
    console.log(element);
    this._quote.addCustomerToCart({ name: element.name, contact: element.contact});
  }
}

export interface User {
  name: String
  contact: String
}