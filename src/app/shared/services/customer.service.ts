import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
 
  //endpoints
  private endpoint = "http://localhost:3000/api"

  constructor(private http: HttpClient, public _router: Router) { }

  // Returns ALL items from the database
  public getCustomers(): Promise<any> {
    let api = `${this.endpoint}/customers`;
    return this.http.get(api, { headers: this.headers }).toPromise();
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';

    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    }
    else {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(msg);
  }
}
