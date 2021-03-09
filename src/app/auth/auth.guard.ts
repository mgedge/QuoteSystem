import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthService } from "../auth.service";

//import { AuthenticationService } from '@app/services'

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //const currentUser = this._authService.getUserRole;

        //Check if the user is logged in. If not, reject access
        if(this._authService.loggedIn === true) {
            //Check if role is accessible
            let role = localStorage.getItem('role');
            let roleVar = Number(role);

            //console.log(route.data)

            //The role required and the role the user has are not the same
            if(route.data.role && route.data.role.indexOf(roleVar) === -1) {
                window.alert("Access not permitted - required role: '" + route.data.role + "' but has: '" + roleVar + "'");
                this._router.navigate(['/#']);
                return false;
            }

            //User passed role check
            return true;
        }

        //User isn't logged in
        return false;



        // if(this._authService.loggedIn) {
        //     console.log("User is logged in");
        //     return true;
        // }
        // else {
        //     console.log("User is not logged in");
        //     this._router.navigate(["../login"]);
        // }

        // return false;


        /*
        const currentUser = this.authenticationService.currentUser;
        if(currentUser) {
            if(route.data.roles && route.data.roles.indexof(currentUser.role) == -1) {
                this.router.navigate(['login']); //redirect to home screen
                return false;
            }

            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
        */
    }

}