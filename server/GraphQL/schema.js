const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type role {
        role_id: String!
        role_title: String!
    }
    type User {
        _id: String!
        username: String!
        password: String!
        firstname: String!
        lastname: String!
        image: String!
        roles: [role!]!
    }
    type UserData {
        users: [User!]!
    }
    type RootQuery {
        users: UserData!
    }
    type RootMutation {
        getUserRoleByID(_id: ID!): User!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);