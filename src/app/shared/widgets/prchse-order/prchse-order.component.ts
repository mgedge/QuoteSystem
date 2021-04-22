import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prchse-order',
  templateUrl: './prchse-order.component.html',
  styleUrls: ['./prchse-order.component.css']
})
export class PrchseOrderComponent implements OnInit {
  commForm:any= FormGroup;

  constructor(
    private _auth: AuthService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.commForm = this.fb.group({
      quoteID: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (window.confirm('Are you sure?')) {
      this._auth.processOrder(this.commForm.quoteID)
      }
    }
}
