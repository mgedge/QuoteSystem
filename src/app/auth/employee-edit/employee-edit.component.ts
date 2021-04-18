import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/auth/model/employee'
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  editForm:any= FormGroup;
  Employee:any = [];

  constructor(
    private _auth: AuthService,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private _router: Router
  ) { }

  // Josh: Gets id for data, and loads into form
  ngOnInit() {
    this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  getEmployee(id: any) {
    this._auth.loadUser(id).subscribe(data => {
      this.editForm.setValue({
        username: data['username'],
        firstname: data['firstname'],
        lastname: data['lastname'],
        image: data['image'],
      });
    });
  }

  updateEmployee() {
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
            this._router.navigate(['/#/view'])
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
        }
      }
    }