/***************************************************
 * schema.js
 * 
 * This file defines the schemas that can be retrieved from
 * GraphQL calls.
 * 
 * For example, to get the users, the RootQuery and UserData
 * are accessed in the form of { users { users }}, defined by
 * its property. To request the properties of users the User
 * type is accessed. { users { users { username }}} for example.
 * 
 **************************************************/

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type role {
        role_id: String
        role_title: String
    }
    type User {
        _id: String!
        username: String!
        password: String!
        firstname: String!
        lastname: String!
        image: String!
        roles: [role!]
    }
    type UserData {
        users: [User!]!
    }


    type item {
        name: String!
        count: Int!
    }
    type Quote {
        _id: String!
        quoteID: Int!
        username: String!
        customer: String!
        email: String!
        items: [item!]!
        status: String!
        discount: String!
    }
    type QuoteData {
        quotes: [Quote!]!
    }



    type RootQuery {
        users: UserData!
        quotes: QuoteData!
    }
    type RootMutation {
        getUserRoleByID(_id: ID!): User!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);