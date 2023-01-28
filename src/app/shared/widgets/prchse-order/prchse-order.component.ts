import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prchse-order',
  templateUrl: './prchse-order.component.html',
  styleUrls: ['./prchse-order.component.css']
})
export class PrchseOrderComponent implements OnInit {
  commForm:any= UntypedFormGroup;

  orderData:any = {}; 

  constructor(
    private _auth: AuthService,
    public fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.commForm = this.fb.group({
      quoteID: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (window.confirm('Are you sure?')) {
      this._auth.processOrder(this.orderData)
      }
    }
}
