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
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //endpoints
  private endpoint = "http://localhost:3000/api"

  cartArray: any = [
    {number: 1, description: "aSda", price: 50, weight: 50, pictureURL: "asda"},
    {number: 1, description: "aSda", price: 50, weight: 50, pictureURL: "asda"},
    {number: 1, description: "aSda", price: 50, weight: 50, pictureURL: "asda"},
  ]
  // private cart = new Subject<Element>();
  private cartSubject = new BehaviorSubject<any>(this.cartArray);
  cartObservable = this.cartSubject.asObservable();
  // cartObs = this.cart.asObservable();


  constructor(private http: HttpClient, public _router: Router) { }

  // Returns ALL quotes from the database
  public getQuotes(): Observable<any> {
    let api = `${this.endpoint}/quotes`;

    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }


  public addQuote(quote: any) {
    let api = `${this.endpoint}/add-quote`
    return this.http.post<any>(api, quote)
      .pipe(
        catchError(this.handleError)
      )
  }


  /******************************* /
   * 
   * Cart Functions
   * 
   * ******************************/
  public addItemToCart(item: any) {
    console.log("Cart ");
    console.log(this.cartArray);
    // this.cart.next(item);
    this.cartArray.push(item);
    // this.cartSubject.next(item);
  }

  public getCart(): Observable<Item> {
    return this.cartSubject.asObservable()

    map((res: any) => {
      return res || {}
    }),
    catchError(this.handleError)
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

export interface Item {
  number: String
  description: String
  price: Number
  weight: Number
  pictureURL: String
  quantity: Number
}