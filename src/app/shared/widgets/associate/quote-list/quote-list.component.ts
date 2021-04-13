import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/shared/services/quote.service';

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
    private _quote: QuoteService,
  ) { 
    this.loadQuotes();
  }

  ngOnInit(): void {
  }

  loadQuotes() {
    this._quote.getQuotes().subscribe(quotes =>{
      this.quoteList = quotes;
      this.dataSource = this.quoteList;
    })
  }

}