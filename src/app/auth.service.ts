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

  registerUser(user: any) {
    let api = `${this.endpoint}/register`
    return this.http.post<any>(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  loginUser(user: any) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token)

        this.currentUser = res.msg;
        this.currentUserID = res.msg.userID

        this.getUserRole(res.msg.userID).subscribe(
          (res: any) => {
            this.currentUserRole = res.msg.role_id;
        },
          (error) => {
            console.log(error)
        });

        this._router.navigate([`/#`])
      });
  }

  logoutUser() {
    let authToken = localStorage.removeItem('token');

    if(authToken == null) {
      this._router.navigate(['login']);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public get loggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  public getUserRole(id: any){  
    let api = `${this.endpoint}/user/role/${id}`;
    let resp = this.http.get(api);

    return resp;
  }

  public getCurrentUserRole(id: any): Observable<any> {
    let api = `${this.endpoint}/user/role/${id}`;

    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  public getCurrentUser(id: any): Observable<any> {
    let api = `${this.endpoint}/user/${id}`;

    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  public getUser(): Observable<any> {
    let api = `${this.endpoint}/user`;

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

    if(error.error instanceof ErrorEvent) {
      msg = error.error.message;
    }
    else {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(msg);
  }
}
