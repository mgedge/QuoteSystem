/***************************************************
 * quote.service
 * 
 * This file allows components throughout the project
 * to access quotes
 * 
 **************************************************/

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //endpoints
  private endpoint = "http://localhost:3000/api"

  currentUser = {};
  currentUserID: number = 0;
  currentUserRole: number = 0;


  constructor(private http: HttpClient, public _router: Router) { }

  // Returns ALL items from the database
  public getItems(): Observable<any> {
    let api = `${this.endpoint}/items`;

    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  public getParts(): Promise<any> {
    let api = `${this.endpoint}/parts`;
    return this.http.get(api, { headers: this.headers }).toPromise();
  }

  public findPart(item: any): Promise<any> {
    let api = `${this.endpoint}/parts/${item}`;
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
