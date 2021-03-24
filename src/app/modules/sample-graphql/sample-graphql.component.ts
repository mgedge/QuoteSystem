import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag'
import { map } from 'rxjs/operators';

const GET_USERS = gql`
{
  users { 
    users {
      firstname 
      lastname 
      roles { 
        role_title 
      }
    }
  }
}
`;


@Component({
  selector: 'app-sample-graphql',
  templateUrl: './sample-graphql.component.html',
  styleUrls: ['./sample-graphql.component.css']
})
export class SampleGraphqlComponent implements OnInit {
  users: any;
  loading: boolean = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.users = this.apollo
      .watchQuery({
        query: GET_USERS,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.users.users;
        })
      )
  }

}
