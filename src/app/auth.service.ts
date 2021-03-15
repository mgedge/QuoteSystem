import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //endpoints
  private endpoint = "http://localhost:3000/api"
  // private _registerUrl = "http://localhost:3000/api/register";
  // private _loginUrl = "http://localhost:3000/api/login";
  // private _userUrl = "http://localhost:3000/api/user"

  currentUser = {};
  currentUserID: number = 0;
  currentUserRole: number = 0;


  constructor(private http: HttpClient, public _router: Router) { }

  registerUser(user: any) {
    let api = `${this.endpoint}/register`
    //let api = this._registerUrl;
    return this.http.post<any>(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  loginUser(user: any) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('currentUser', res.msg.userID)

        this.currentUser = res;

        console.log("auth.service - CURRENT USER: " + res.msg.userID)
        this.currentUserID = res.msg.userID

        //console.log(this.currentUser)

        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['/#'])
        // })

        //let role: any;

        console.log("auth.service - Entering getUserRole: " + res.msg.userID)
        this.getUserRole(res.msg.userID).subscribe(
          (res: any) => {
            console.log("auth.service - CURRENT ROLE: " + res.msg.role_id)
            //role = res.msg.role_id;
            this.currentUserRole = res.msg.role_id;
            //localStorage.setItem('role', res.msg.role_id)
        },
          (error) => {
            console.log(error)
        });

        this._router.navigate([`/#/${this.currentUserID}`])
      });
  }

  logoutUser() {
    console.log("Logging out from auth.service.ts")
    let authToken = localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role')

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
    //return !!localStorage.getItem('token');
  }

  public getUserRole(id: any){  
    //console.log("auth.service - entered getUserRole")
    let api = `${this.endpoint}/user/role/${id}`;

   //console.log("Performing api: " + api)

    let resp = this.http.get(api);

    //console.log("Reponse received: " + resp);
    //console.log(resp);

    return resp;
      
   //   , { headers: this.headers })
    /*
    .pipe(
      map((res: any) => {
        console.log(res)
        return res || {}
      }),
      catchError(this.handleError)
    )
    */
  }

  public getCurrentUserRole(id: any): Observable<any> {
    let api = `${this.endpoint}/user/role/${id}`;
    // var role = 0;

    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        // role = res.msg.role;
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
