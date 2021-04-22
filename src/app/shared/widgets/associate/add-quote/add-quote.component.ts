import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth.service'
import { QuoteCartComponent } from '../quote-cart/quote-cart.component';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})

export class AddQuoteComponent implements OnInit {

  error: string = '';

  quoteForm: FormGroup;
  quoteData: any = {
    quoteID: '',
    username: '',
    customer: '',
    contact: '',
    items: [
      { name: '', count: '' }
    ],
    status: '',
    discount: ''
  };

  cart: any = [];

  // @ViewChild(QuoteCartComponent)  
  // set QuoteCart(value: QuoteCartComponent) {
  //   this.cart = value.itemList;
  // }

  constructor(
    private _auth: AuthService,
    public formBuilder: FormBuilder,
  ) {
    this.quoteForm = this.formBuilder.group({
      customer: ['', Validators.required],
      contact: ['', Validators.required],
      items: [
        // {name: '', count: ''}
      ],
    });

    this.cart = [];
  }

  ngOnInit(): void {
    
  }


  newQuote() {
    this.quoteData.quoteID = this._auth.getNextQuoteID();
    this.quoteData.username = this._auth.getCurrentID();
    this.quoteData.status = 'open';
    this.quoteData.discount = '0%';

    this._auth.createQuote(this.quoteData)
      .subscribe(
        res => {
          console.log(res)

          //Registration complete
          if (res.new_quote) {
            this.quoteForm.reset();
          }
        },
        err => console.log(err)

      )
  }


}
