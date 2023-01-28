import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { QuoteService } from 'src/app/shared/services/quote.service';
import { AuthService } from '../../../../auth.service'
import { QuoteCartComponent } from '../quote-cart/quote-cart.component';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})

export class AddQuoteComponent implements OnInit {

  error: string = '';

  update: boolean = false;
  customer: any = {};
  cart: any = [];

  quoteID: any;

  employeeID: any;
  quoteForm: UntypedFormGroup;
  quoteData: any = {
    quoteID: '',
    username: '',
    customer: '',
    contact: '',
    items: [
      // { name: '', count: '' }
    ],
    status: '',
    discount: ''
  };

  constructor(
    private _auth: AuthService,
    private _quote: QuoteService,
    public formBuilder: UntypedFormBuilder,
  ) {
    this.quoteForm = this.formBuilder.group({
      customer: ['', Validators.required],
      contact: ['', Validators.required],
      items: [
        // {name: '', count: ''}
      ],
    });
  }

  ngOnInit(): void {
    this.getAssociate();
    this.loadCustomer();
    this.loadItems();
    this.loadUpdate();
    this.getNextQuote();
  }

  newQuote() {
    console.log("new quote");
    // this.quoteData.quoteID = this._auth.getNextQuoteID();
    // this.quoteData.username = this._auth.getCurrentID();
    this.quoteData.status = 'open';
    this.quoteData.discount = '0%';

    this.quoteData.email = this.customer.contact;
    this.quoteData.customer = this.customer.name;

    this.convertToCart();

    console.log(this.quoteData);

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

  updateQuote() {
    console.log("update quote");

    // this.quoteData.username = this._auth.getCurrentID();
    this.quoteData.status = 'open';
    this.quoteData.discount = '0%';

    this.quoteData.contact = this.customer.contact;
    this.quoteData.customer = this.customer.name;

    this.convertToCart();

    this._auth.updateQuote(this._quote.quoteID, this.quoteData)
      .subscribe(
        (res: { new_quote: any; }) => {
          console.log(res)

          //Registration complete
          if (res.new_quote) {
            this.quoteForm.reset();
          }
        },
        (err: any) => console.log(err)

      )
  }

  loadItems() {
    this._quote.cartObservable.subscribe((cart: Cart) => {
      this.cart = cart;
      console.log(this.cart);
      // this.quoteData.items.name = cart.description;
      // this.quoteData.items.count = cart.price;
      this.quoteData.items = cart;
      console.log(this.quoteData.items);
    })
  }

  loadCustomer() {
    this._quote.userObservable.subscribe((cart: any) => {
      console.log(cart);
      this.customer = cart;
      this.quoteData.customer = cart.name;
      this.quoteData.contact = cart.contact;
    });
  }

  loadUpdate() {
    this._quote.updateObservable.subscribe((res: boolean) => {
      this.update = res;
      console.log(this.update);
    });
  }

  getNextQuote() {
    var quoteList; //access all known quotes
    let nextID = 0; //initialize container
    this._auth.getQuotes().subscribe((res:any) => { 
      quoteList = res;
      for (let quote of quoteList) //for all quotes
      {
        if (quote.quoteID > nextID) { //check if this is the highest used quoteID
          nextID = quote.quoteID; //if so, store it
        }
      }
      ++nextID; //increment by 1
      this.quoteData.quoteID = nextID;
    });
  }

  convertToCart() {
    // this.quoteData.items.forEach((element: any) => {
    for (let element of this.quoteData.items) {
      element.name = element.description;
      element.count = parseInt(element.quantity);
    };
  }

  // reset() {
  //   this.update = false;
  //   this.quoteData = null;
  //   this.quoteForm.reset();
  // }

  getAssociate() {
    //First get the userID from the token
    this._auth.getUser().then((res: any) => {
      this.employeeID = res.userID

      //Retrieve the current user's profile
      this._auth.getCurrentUser(this.employeeID).then((res: any) => {
        //Set the user to the returned user profile
        this.quoteData.username = res.user.username;
      });
    });
  }
}

export interface Cart {
  description: String
  price: Number
}


