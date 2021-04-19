import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css']
})
export class ViewQuoteComponent implements OnInit {

  Quote:any = [];
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
      this.Quote = quotes
      this.dataSource = this.Quote;
    })
  }

  removeQuote(_id: string) {
    // console.log('HTML grabbed (' + _id + ') and sent to removeUser. Sending now to deleteUser')
    if(window.confirm('Are you sure?')) {
      this._auth.deleteQuote(_id).subscribe((res) => {
        // console.log('Finshed deletion of (' + _id + '). Reloading users')
        this.loadQuotes();
      });
    }
  }

}
