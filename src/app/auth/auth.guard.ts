import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    urlId: any;
    storageId: any;
    currentUser: any = {};
    urlUser: any = {};


    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.urlId = this._activatedRoute.snapshot.paramMap.get('userID');

        //Retrieve the user's ID
        //*** FROM THE TOKEN */
        if(this.urlId === undefined || this.urlId === null) {
            this.urlId = localStorage.getItem('currentUser');
        }

        //Retrieve the current user's profile
        this._auth.getCurrentUser(this.urlId).subscribe((res: any) => {
            //Set the user to the returned user profile
            this.currentUser = res.msg;

            //Next retrieve the user's role
            this._auth.getCurrentUserRole(this.currentUser.userID).subscribe((res: any) => { this.currentUser.role = res.msg.role_id });
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //Check if the user is logged in. If not, reject access

        // if(this._auth.tokenExpired()) {
        //     this._router.navigate(['login'])
        //    return false; 
        // }

        if(this._authService.loggedIn === true) {
            //Check if role is accessible


            //The role required and the role the user has are not the same
            if(route.data.role && route.data.role.indexOf(this.currentUser.role) === -1) {
                window.alert("Access not permitted - required role: '" + route.data.role + "' but has: '" + this.currentUser.role + "'");
                this._router.navigate(['/#']);
                return false;
            }            


            // this._auth.getCurrentUser(id).subscribe((res: any) => {
            //     //Set the user to the returned user profile
            //     this.currentUser = res.msg;
        
            //     //Next retrieve the user's role
            //     this._auth.getCurrentUserRole(this.currentUser.userID).subscribe((res: any) => { 
            //         this.currentUser.role = res.msg.role_id 
                

            //         console.log(this.currentUser.role);

            //         //The role required and the role the user has are not the same
            //         if(route.data.role && route.data.role.indexOf(roleVar) === -1) {
            //             window.alert("Access not permitted - required role: '" + route.data.role + "' but has: '" + roleVar + "'");
            //             this._router.navigate(['/#']);
            //         }
            //     });
            //   })
            


            // let role = this.currentUser.role;
            // let roleVar = Number(role);

            //If the url id does not match the userID, reject access
            // if(Number(this.urlUser.userID) !== userID) {
            //     console.log(userID);
            //     //this._router.navigate([`/#`]);
            //     return false;
            // }

            //The role required and the role the user has are not the same
            // if(route.data.role && route.data.role.indexOf(roleVar) === -1) {
            //     window.alert("Access not permitted - required role: '" + route.data.role + "' but has: '" + roleVar + "'");
            //     this._router.navigate(['/#']);
            //     return false;
            // }

            //User passed role check
            return true;
        }

        this._auth.logoutUser();
        this._router.navigate(['login'])

        //User isn't logged in
        return false;
    }
}