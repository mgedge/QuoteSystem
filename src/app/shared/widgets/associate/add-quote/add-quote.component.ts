import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getDirectiveNames } from '@apollo/client/utilities';
import { AuthService } from '../../../../auth.service'

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})

export class AddQuoteComponent implements OnInit {
  quoteForm: FormGroup;
  quoteData: any = {
    quoteID: '',
    username: '', 
    customer: '',
    contact: '',
    items: [
      { name: '', count: ''}
    ],
    status: '',
    discount: ''
  };

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
    })
  }

  ngOnInit(): void {
  }

  error: string = '';
  //Item amounts
  amountOptions: any = [
    { count: '10', checked: false },
    { count: '20', checked: false },
    { count: '50', checked: false }
  ];

  itemOptions: any = [
    { name: 'steel screws', checked: false },
    { name: '2x4 wood planks', checked: false }
  ];

  
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
