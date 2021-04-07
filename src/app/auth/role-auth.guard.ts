import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

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


@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {
  userID: any;
  currentUser: any = {};

  constructor(
    private apollo: Apollo,
    private _auth: AuthService,
    private _router: Router,
    //private _activatedRoute: ActivatedRoute,
  ) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    //Get the userID
    await this._auth.getUser().then((res: any) => {
      this.userID = res.userID;
    });

    //Use GraphQL to get the user's roles
    await this.getQuery(this.userID);

    // //If the user has roles
    if (this.currentUser.roles) {

      let access = false;

      //Ensure the user has role access to this area
      for (let i = 0; i < this.currentUser.roles.length; i++) {
        console.log(this.currentUser.roles.length)
        //Ensure the required role and user role match
        if (route.data.role && route.data.role.indexOf(this.currentUser.roles[i].role_id) === -1) {
          if (!access)
            access = false;
        }
        else {
          access = true;
        }
      }

      if (access) {
        return true;
      }
      else {
        window.alert("Access not permitted - required role: '" + route.data.role + "'");
        this._router.navigate(['/#']);
        return false;
      }
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
    // BUG
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
}
