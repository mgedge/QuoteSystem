import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuoteService } from 'src/app/shared/services/quote.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})

export class QuoteListComponent implements OnInit {
  searchValue = '';
  quoteList: any = [];

  displayedColumns: string[] = ['quoteID', 'customer', 'username', 'status'];
  dataSource = new MatTableDataSource<Element>(this.quoteList);

  constructor(
    private _quote: QuoteService,
  ) { 
  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this._quote.getQuotes().subscribe(quotes =>{
      this.dataSource.data = quotes;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

interface Element {
  QuoteID: String
  username: String
  customer: String
  email: String
  status: String
  discount: String
}