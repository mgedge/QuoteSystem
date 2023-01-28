import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.css']
})
export class EditQuoteComponent implements OnInit {
  editForm:any= UntypedFormGroup;

  constructor(
    private _auth: AuthService,
    public fb: UntypedFormBuilder,
    private actRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.updateQuote();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getQuote(id);
    this.editForm = this.fb.group({
      username: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['', [Validators.required]],
      discount: ['', [Validators.required]]
    })
  }

  getQuote(id: any) {
    this._auth.loadQuote(id).subscribe(data => {
      this.editForm.setValue({
        username: data['username'],
        customer: data['customer'],
        email: data['email'],
        status: data['status'],
        discount: data['discount'],
      });
    });
  }

  updateQuote() {
    this.editForm = this.fb.group({
      username: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['', [Validators.required]],
      discount: ['', [Validators.required]]
    })
  }
  onSubmit() {
    if (window.confirm('Are you sure?')) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this._auth.updateQuote(id, this.editForm.value)
        .subscribe(res => {
          this._router.navigate(['/#/associate'])
        }, (error) => {
          console.log(error)
        })
      }
    }

}
