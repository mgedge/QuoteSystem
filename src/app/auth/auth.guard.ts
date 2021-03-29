import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthService } from "../auth.service";
import { gql } from 'graphql-tag'
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';


const GET_USER = gql`
query user($_id: String!) {
    user(_id: $_id) {
        username
        roles {
            role_id
            role_title
        }
    }
}`;


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    userID: number = 0;
    currentUser: any = {};

    constructor(
        private apollo: Apollo,
        private _auth: AuthService,
        private _router: Router,
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
    ) {
        //First get the userID from the token
        this._auth.getUser().subscribe((res: any) => {
            this.userID = res.userID

            //Retrieve the current user's profile
            this._auth.getCurrentUser(this.userID).subscribe((res: any) => {
                //Set the user to the returned user profile
                this.currentUser = res.user;

                //Next retrieve the user's roles
                if (this.currentUser.roles.length > 0) {
                    //this.setPriorityRole();
                }
            });
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //Verify token is still valid
        // if(this._auth.tokenExpired()) {
        //     this._router.navigate(['login'])
        //    return false; 
        // }

        // this.getQuery(this.userID);

        let token: any = localStorage.getItem('token');

        // console.log(this.currentUser);

        //If user is not logged in, reject access
        if (this._authService.loggedIn === true) {
            //If the token is expired, goto login
            if (this.tokenExpired(token)) {
                //Clear any credentials, in case accessing fraudulently 
                this._auth.logoutUser();

                //Navigate back to login
                this._router.navigate(['login'])

                return false;
            }

            // TODO: Fix role authorization

            //Ensure the user has access to this area
            // for (let i = 0; i < this.currentUser.roles.length; i++) {
            //     console.log(route.data.role)
            //     console.log(this.currentUser.roles[i].role_id);

            //     if (route.data.role && route.data.role.indexOf(this.currentUser.roles[i].role_id) === -1) {
            //         window.alert("Access not permitted - required role: '" + route.data.role + "'");
            //         this._router.navigate(['/#']);
            //         return false;
            //     }
            // }


            return true;
        }

        //Clear any credentials, in case accessing fraudulently 
        this._auth.logoutUser();

        //Navigate back to login
        this._router.navigate(['login'])

        return false;
    }

    authenticate(route: ActivatedRouteSnapshot): boolean {
        //If user is not logged in, reject access
        if (this._authService.loggedIn === true) {
            //Ensure the user has access to this area
            for (let i = 0; i < this.currentUser.roles.length; i++) {
                console.log(route.data.role)
                console.log(this.currentUser.roles[i].role_id);

                if (route.data.role && route.data.role.indexOf(this.currentUser.roles[i].role_id) === -1) {
                    window.alert("Access not permitted - required role: '" + route.data.role + "'");
                    this._router.navigate(['/#']);
                    return false;
                }
            }


            return true;
        }

        return false
    }

    getQuery(id: any) {
        let getQuery: any = `
        mutation {
            getUserRoleByID(_id: "` + id + `") {
                roles {
                    role_id
                    role_title
                }
            }
        }`

        getQuery = gql(getQuery);

        this.currentUser = this.apollo
            .mutate({
                mutation: getQuery,
                refetchQueries: [{ query: GET_USER }],
                variables: {
                    _id: id,
                }
            })
            .subscribe(res => {
                this.setCurrentUser(res);
            })
    }

    setCurrentUser(user: any) {
        this.currentUser = user;
    }

    hasRoleID(role: String): boolean {
        for (var i = 0; i < this.currentUser.roles.length; i++) {
            if (this.currentUser.roles[i].role_title === role) {
                return true;
            }
        }

        return false;
    }

    tokenExpired(token: string) {
        const expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiration;
    }
}