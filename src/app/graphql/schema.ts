import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const query = `
  type Query {
    users: [User]
    user(id: String): User
  }
`

const mutation = `
  type Mutation {
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    deleteUser(input: IdInput!): User
  }
`

const models = `
  type User {
    id: ID
    name: String
    email: String
  }
`

const inputs = `
  input UserCreateInput {
    name: String!
    email: String!
    password: String!
  }

  input UserUpdateInput {
    id: ID
    name: String
    email: String
    password: String
  }

  input IdInput {
    id: ID!
  }

`

const typeDefs = query + mutation + models + inputs

export default makeExecutableSchema({ typeDefs, resolvers })
