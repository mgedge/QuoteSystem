import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css']
})
export class ViewQuoteComponent implements OnInit {
  searchValue = '';
  quotes:any = [];
  displayedColumns: string[] = ["QuoteID", "username", "customer", "email", "status", "discount", "buttons"];
  dataSource = new MatTableDataSource<Element>(this.quotes);


  constructor(
    private _auth: AuthService,
    private _quote: QuoteService,
  ) { }

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
    this._auth.getQuotes().subscribe(quotes =>{
      this.dataSource.data = quotes;
    })
  }

  removeQuote(_id: string) {
    if(window.confirm('Are you sure?')) {
      this._auth.deleteQuote(_id).subscribe((res) => {
        this.loadQuotes();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sendItem(item: any) {
    this._quote.addQuoteToCart(item);
    this._quote.switchUpdate(true);
  }
}

interface Element {
  QuoteID: String
  username: String
  customer: String
  contact: String
  status: String
  discount: String
}
