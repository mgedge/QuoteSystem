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
    customerName: '',
    contact: '',
    items: [
      { name: '', count: '', selected: false }
    ]
  };

  allSelected: boolean = false;

  someChosen(): boolean {
    if (this.quoteData.items == null) {
      return false;
    }
    return this.quoteData.items.filter(this.quoteData.items.selected).length > 0 && !this.allSelected;
  }
  
  updateAmtSelected() {
    this.allSelected = this.quoteData.items != null && this.quoteData.items.every(this.quoteData.items.selected);
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    if (this.quoteData.items == null) {
      return;
    }
    this.quoteData.items.selected.forEach(this.quoteData.items.selected = selected);
  }

  constructor(
    private _auth: AuthService,
    public formBuilder: FormBuilder,
  ) { 
    this.quoteForm = this.formBuilder.group({
      customerName: ['', Validators.required],
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
  ]

  /**
   * Iterate through all the roles. If checked add them to the user's form submission
   */
   addItems() {
    var selectedItem = false;
    var counter = 0;

    //Iterate through the possible amounts desired
    for (var i = 0; i < this.amountOptions.length; i++) {
      //If checked, add to the quote
      if (this.amountOptions[i].checked) {
        //Set the index of the profile equal to the checked role
        this.quoteData.items[counter] = this.amountOptions[i];

        //Remove the checked property
        delete this.quoteData.roles[counter].checked;

        //Increment next registerUser role
        counter++;

        //Check has role
        selectedItem = true;
      }
    }
  }

  newQuote() {
    this.addItems();

    this._auth.createQuote(this.quoteData)
      .subscribe(
        res => {
          console.log(res)

          //Registration complete
          if (res.new_user) {
            this.quoteForm.reset();
          }
        },
        err => console.log(err)

      )
  }

}
