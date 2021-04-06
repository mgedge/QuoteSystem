/***************************************************
 * auth.guard.ts
 * 
 * This file is charged with protecting routing
 * 
 * When the user accesses the website, it is possible
 * to modify the URL to access other parts. This should
 * not happen since the application requires authentication.
 * 
 * This file will be called when the user navigates throughout
 * the website. If the user does not have the required token
 * or roles, the user is denied access to that route.
 * 
 **************************************************/

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthService } from "../auth.service";
import { gql } from 'graphql-tag'
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

//GraphQL call to get the User's role information
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

    }

    //Return true or false if the user is permitted to access the called url

    /* TODO: Fix role authorization
        It is currently possible, with the use of multiple roles, to navigate to unauthorized pages by manipulating
        the url. In order to remedy, this function needs to get the user's roles and iterate through them to verify
        that the user has the required role. The issue here is with the asynchronous subscribe function. Subscribe does
        not stop the subsequent program, so by the time the function returns the user's roles, the canActivate function has 
        already determined (falsely), that the user does not have the required role.
    */
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        //Get the userID
        await this._auth.getUser().then((res: any) => {
            this.userID = res.userID;
        });

        //Use GraphQL to get the user's roles
        await this.getQuery(this.userID);

        //Retrieve the token
        let token: any = localStorage.getItem('token');

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

            //If the user has roles
            if (this.currentUser.roles) {
                //Ensure the user has role access to this area
                for (let i = 0; i < this.currentUser.roles.length; i++) {
                    //Ensure the required role and user role match
                    if (route.data.role && route.data.role.indexOf(this.currentUser.roles[i].role_id) === -1) {
                        window.alert("Access not permitted - required role: '" + route.data.role + "'");
                        this._router.navigate(['/#']);
                        return false;
                    }
                }
            }

            return true;
        }

        //Clear any credentials, in case accessing fraudulently 
        this._auth.logoutUser();

        //Navigate back to login
        this._router.navigate(['login'])

        //Deny access
        return false;
    }

    // This function shall be used to retrieve the user's roles
    async getQuery(id: any) {
        let getQuery: any = `
        mutation {
            getUserRoleByID(_id: "` + id + `") {
                roles {
                    role_id
                    role_title
                }
            }
        }`

        //gqlize the query
        getQuery = gql(getQuery);

        //Set the roles in this file
        this.currentUser.roles = await this.apollo
            .mutate({
                mutation: getQuery,
                refetchQueries: [{ query: GET_USER }],
                variables: {
                    _id: id,
                }
            })
            .toPromise().then((res: any) => {
                return res.data.getUserRoleByID.roles;
            })
    }

    // //Sets the currentUser object of this file
    // setCurrentUser(user: any) {
    //     this.currentUser = user;
    // }

    // //Returns t/f if the user has the required role
    // hasRoleID(role: String): boolean {
    //     for (var i = 0; i < this.currentUser.roles.length; i++) {
    //         if (this.currentUser.roles[i].role_title === role) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

    //This function determines if the token has expired
    tokenExpired(token: string) {
        const expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiration;
    }
}