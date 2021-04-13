import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})

export class QuoteListComponent implements OnInit {
  quoteList: any = [
    {quoteID: '', customer: '', username: '', status: '', items: {name: '', count: ''}}
  ];

  displayedColumns: string[] = ['quoteID', 'customer', 'username', 'status'];
  dataSource: any;

  constructor(
    private _auth: AuthService,
  ) { 
    this.loadQuotes();
  }

  ngOnInit(): void {
  }

  loadQuotes() {
    this._auth.getQuotes().subscribe(quotes =>{
      this.quoteList = quotes;
      this.dataSource = this.quoteList;
    })
  }

}