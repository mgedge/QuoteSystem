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
import { ItemService } from './item.service';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //endpoints
  private endpoint = "http://localhost:3000/api"

  cartArray: any = []
  cartUser: any = {};
  update: boolean = false;

  quoteID: any;

  private userSubject = new BehaviorSubject<User>(this.cartUser);
  userObservable = this.userSubject.asObservable();
  private cartSubject = new BehaviorSubject<Item>(this.cartArray);
  cartObservable = this.cartSubject.asObservable();
  private updateSubject = new BehaviorSubject<boolean>(this.update);
  updateObservable = this.updateSubject.asObservable();


  constructor(
    private http: HttpClient,
    public _router: Router,
    private _item: ItemService,
  ) { }

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
    this.cartArray.push(item);
    this.cartSubject = new BehaviorSubject<Item>(this.cartArray);
  }

  public removeItemFromCart(item: Item) {
    this.cartArray.pop(item);
    this.cartSubject = new BehaviorSubject<Item>(this.cartArray);
  }

  public addCustomerToCart(user: User) {
    this.cartUser = user;
    this.userSubject.next(user);
  }

  public addQuoteToCart(res: any) {
    console.log(res);
    this.quoteID = res._id;
    this.cartUser.name = res.customer;
    this.cartUser.contact = res.email;
    this.userSubject.next(this.cartUser);

    for (let item of res.items) {
      this._item.findPart(item.name).then(res => {
        if (res != null) {
          console.log(res);
          // item.count = item.
          this.addItemToCart(res);
        }
      }).catch((res: any) => {
        console.log(res);
      })
    }
  }

  public switchUpdate(res: boolean) {
    this.update = res;
    this.updateSubject.next(this.update);
  }

  public getCart(): Observable<Item> {
    return this.cartSubject.asObservable();
  }

  public getCustomer(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public getUpdate(): Observable<boolean> {
    return this.updateSubject.asObservable();
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