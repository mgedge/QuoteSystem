/***************************************************
 * auth.service
 * 
 * This file allows components throughout the project
 * to login/register, access user's token, and logout
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
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //endpoints
  private endpoint = "http://localhost:3000/api"

  currentUser = {};
  currentUserID: number = 0;
  currentUserRole: number = 0;


  constructor(private http: HttpClient, public _router: Router) { }

  // Service to call the register API
  registerUser(user: any) {
    let api = `${this.endpoint}/register`
    return this.http.post<any>(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Load user by id
  loadUser(id: any): Observable<any> {
    let url = `${this.endpoint}/loaduser/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Load quote by id
  loadQuote(id: any): Observable<any> {
    let url = `${this.endpoint}/loadquote/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Updates user data by id
  updateUser(_id: any, user: any): Observable<any> {
    let url = `${this.endpoint}/updateuser/${_id}`;
    return this.http.put(url, user, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  // Updates quote by id
  updateQuote(_id: any, user: any): Observable<any> {
    let url = `${this.endpoint}/updatequote/${_id}`;
    return this.http.put(url, user, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  // Deletes user by id
  deleteUser(_id: string): Observable<any> {
    let url = `${this.endpoint}/deleteuser/${_id}`;
    // console.log('Gave (' + _id + ') to deleteUser. Sending to API now.')
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  // Updates quote by id
  deleteQuote(_id: string): Observable<any> {
    let url = `${this.endpoint}/deletequote/${_id}`;
    // console.log('Gave (' + _id + ') to deleteUser. Sending to API now.')
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  // Service to call the login API and set token
  loginUser(user: any) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
  }

  // Service to remove user token and navigate to login
  logoutUser() {
    let authToken = localStorage.removeItem('token');

    if (authToken == null) {
      this._router.navigate(['login']);
    }
  }

  // Returns the user's token
  getToken() {
    return localStorage.getItem('token');
  }

  // Returns boolean if user has a token
  public get loggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  // // DEPRECATED Returns API call for the entered user ID's role
  // public getUserRole(id: any) {
  //   let api = `${this.endpoint}/user/role/${id}`;
  //   let resp = this.http.get(api);

  //   return resp;
  // }

  // // DEPRECATED Returns the the current user's role
  // public getCurrentUserRole(id: any): Observable<any> {
  //   let api = `${this.endpoint}/user/role/${id}`;

  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: any) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  // Returns the current user's information
  public getCurrentUser(id: any): Promise<any> {
    let api = `${this.endpoint}/user/${id}`;

    return this.http.get(api, { headers: this.headers }).toPromise()
  }

  // Returns the user's information from token
  public getUser(): Promise<any> {
    let api = `${this.endpoint}/user`;

    return this.http.get(api, { headers: this.headers }).toPromise()
  }

  // Returns ALL employee users from the database including hashed password
  public getUsers(): Observable<any> {
    let api = `${this.endpoint}/users`;

    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  public getQuotes(): Observable<any> {
    let api = `${this.endpoint}/quotes`;

    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  public getCurrentID() {
    return this.currentUserID;
  }

  public getCurrentRole() {
    return this.currentUserRole;
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
