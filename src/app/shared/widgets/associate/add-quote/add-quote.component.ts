import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  customer: any = {};
  cart: any = [];

  employeeID: any;
  quoteForm: FormGroup;
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
    public formBuilder: FormBuilder,
  ) 
  {
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
  }


  newQuote() {
    this.quoteData.quoteID = 11;
    // this.quoteData.username = this._auth.getCurrentID();
    this.quoteData.status = 'open';
    this.quoteData.discount = '0%';

    
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


