import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
    ) {}

/*
    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this._auth.loggedIn !== true) {
            window.alert("Access denied!");
            this._auth.logoutUser();
            this._router.navigate(['login']);
        }
        return true;
    
*/


    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//        const currentUser = this._authService.getCurrentUser;

        //Check if the user is logged in. If not, reject access
        if(this._authService.loggedIn === true) {
            //Check if role is accessible
            //let role = localStorage.getItem('role');
            let role = this._auth.getCurrentRole();

            //let userID = localStorage.getItem('currentUser');
            let routeUserID = this._activatedRoute.snapshot.paramMap.get('userID');
            let userID = this._auth.getCurrentID();

            let roleVar = Number(role);

            console.log("activate:: " + routeUserID + "  ::  " + userID);

            //console.log(route.data)

            // if(Number(routeUserID) !== userID) {
            //     this._router.navigate([`/#/${userID}`])
            //     return false;
            // }

            //The role required and the role the user has are not the same
            if(route.data.role && route.data.role.indexOf(roleVar) === -1) {
                window.alert("Access not permitted - required role: '" + route.data.role + "' but has: '" + roleVar + "'");
                this._router.navigate(['/#']);
                return false;
            }

            //User passed role check
            return true;
        }

        this._auth.logoutUser();
        this._router.navigate(['login'])

        //User isn't logged in
        return false;
    }
}