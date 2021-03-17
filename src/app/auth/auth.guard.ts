import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    currentUser: any = {};

    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
    ) {
        //Retrieve the user from the database
        this._auth.getUser().subscribe((res: any) => {
            //Set the user to the returned user profile
            this.currentUser = res.msg;

            //Next retrieve the user's role
            this._auth.getCurrentUserRole(this.currentUser.userID).subscribe((res: any) => {
                if (res.msg)
                    this.currentUser.role = res.msg.role_id
            });
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //Verify token is still valid
        // if(this._auth.tokenExpired()) {
        //     this._router.navigate(['login'])
        //    return false; 
        // }

        //If user is not logged in, reject access
        if (this._authService.loggedIn === true) {
            //Ensure the user has access to this area
            // if (route.data.role && route.data.role.indexOf(this.currentUser.role) === -1) {
            //     window.alert("Access not permitted - required role: '" + route.data.role + "' but has: '" + this.currentUser.role + "'");
            //     this._router.navigate(['/#']);
            //     return false;                        
            // }

            return true;
        }

        //Clear any credentials, in case accessing fraudulently 
        this._auth.logoutUser();

        //Navigate back to login
        this._router.navigate(['login'])

        return false;
    }
}