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
import { ThisReceiver } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //endpoints
  private endpoint = "http://localhost:3000/api"

  cartArray: any = []
  cartUser: any = {};

  // private cart = new Subject<Element>();
  private userSubject = new BehaviorSubject<User>(this.cartUser);
  userObservable = this.userSubject.asObservable();
  private cartSubject = new BehaviorSubject<Item>(this.cartArray);
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
  public addItemToCart(item: Item) {
    console.log("Cart ");
    console.log(this.cartArray);
  
    this.cartArray.push(item);
    this.cartSubject = new BehaviorSubject<Item>(this.cartArray);
  }

  public addCustomerToCart(user: User) {
    this.cartUser = user;
    this.userSubject.next(user);
  }

  public getCart(): Observable<Item> {
    return this.cartSubject.asObservable();
  }

  public getCustomer(): Observable<User> {
    return this.userSubject.asObservable();
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

export interface Cart {
  description: String
  price: Number
}

export interface User {
  name: String
  contact: String
}