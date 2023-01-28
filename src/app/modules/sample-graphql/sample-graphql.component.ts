import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { getQueryDefinition } from '@apollo/client/utilities';
import { Apollo } from 'apollo-angular';
import { GraphQLType } from 'graphql';
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
  //Chips
  // chipsForm: FormGroup;
  bUsername: boolean = false;
  // bFirstName: boolean = false;
  // bLastName: boolean = false;
  // bRoles: boolean = false;

  selection: any = [
    { item: 'Username', selected: false},
    // { item: 'Password', selected: false},
    { item: 'First name', selected: false},
    { item: 'Last name', selected: false},
    { item: 'Image', selected: false},
    { item: 'Roles', selected: false},
  ];

  //GraphQL
  user_query: any;
  graphqlQueryDocument: any = '';
  graphqlQuerySimple: String = '';
  users: any;
  loading: boolean = true;
  error: any;

  constructor(
    private apollo: Apollo,
    public formBuilder: UntypedFormBuilder,
  ) {
    // this.chipsForm = this.formBuilder.group({
    //   username: false,
    //   firstname: false,
    //   lastname: false,
    //   image: false,
    //   roles: false,
    // });
  }

  ngOnInit(): void {
    this.defineQuery();
    this.getQuery();
  }

  toggleSelection(selection: any) {
    if (selection.selected) {
      selection.selected = false;
    }
    else {
      selection.selected = true;
    }

    this.defineQuery();
    this.getQuery();
  }

  getSelected(selection: String): boolean {
    for(let i = 0; i < this.selection.length; i++) {
      if(this.selection[i].item == selection) {
        return this.selection[i].selected;
      }
    }

    return false;
  }

  defineQuery() {
    let query;
    let username = '';
    let password = '';
    let firstname = '';
    let lastname = '';
    let image = '';
    let roles = '';

    for(let i = 0; i < this.selection.length; i++) {
      if (this.selection[i].selected && this.selection[i].item === 'Username') {
        username = `username `;
      }

      if (this.selection[i].selected && this.selection[i].item === 'Password') {
        password = `password `;
      }
  
      if (this.selection[i].selected && this.selection[i].item === 'First name') {
        firstname = `firstname `;
      }
  
      if (this.selection[i].selected && this.selection[i].item === 'Last name') {
        lastname = `lastname `;
      }

      if (this.selection[i].selected && this.selection[i].item === 'Image') {
        image = `image `;
      }
  
      if (this.selection[i].selected && this.selection[i].item === 'Roles') {
        roles = `roles { role_title } `;
      }
    }

    query = `
    { 
      users { 
        users { ` +
          username + 
          firstname +
          lastname + 
          image +
          roles + ` 
        } 
      } 
    }`;

    if(this.isValidQuery()) {
      this.user_query = gql(query);
      this.graphqlQueryDocument = JSON.stringify(this.user_query);
      this.graphqlQuerySimple = query;
    }
    else {
      this.graphqlQuerySimple = 'No query sent'
    }
  }

  isValidQuery(): boolean {
    let valid = false;

    for(let i = 0; i < this.selection.length; i++) {
      if (this.selection[i].selected && this.selection[i].item === 'Username') {
        valid = true;
      }

      if (this.selection[i].selected && this.selection[i].item === 'Password') {
        valid = true;
      }
  
      if (this.selection[i].selected && this.selection[i].item === 'First name') {
        valid = true;
      }
  
      if (this.selection[i].selected && this.selection[i].item === 'Last name') {
        valid = true;
      }

      if (this.selection[i].selected && this.selection[i].item === 'Image') {
        valid = true;
      }
  
      if (this.selection[i].selected && this.selection[i].item === 'Roles') {
        valid = true;
      }    
    }

    return valid;
  }

  getQuery() {
    if(this.isValidQuery()) {
    this.users = this.apollo
      .watchQuery({
        query: this.user_query,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.users.users;
        })
      )
    }
    else {
      this.user_query = 'No query sent'
      this.graphqlQueryDocument = 'No query was sent to the server'
    }
  }
}