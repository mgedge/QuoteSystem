import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm:any= UntypedFormGroup;

  constructor(
    private _auth: AuthService,
    public fb: UntypedFormBuilder,
    private actRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getUser(id);
    this.editForm = this.fb.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  getUser(id: any) {
    this._auth.loadUser(id).subscribe(data => {
      this.editForm.setValue({
        username: data['username'],
        firstname: data['firstname'],
        lastname: data['lastname'],
        image: data['image'],
      });
    });
  }

  updateUser() {
    this.editForm = this.fb.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }
  
  onSubmit() {
    if (window.confirm('Are you sure?')) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this._auth.updateUser(id, this.editForm.value)
        .subscribe(res => {
          this._router.navigate(['/#/admin'])
        }, (error) => {
          console.log(error)
        })
      }
    }
  }