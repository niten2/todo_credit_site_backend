import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const query = `
  type Query {
    users: [User]
    user: User
  }
`

const mutation = `
  type Mutation {
    createUser(input: UserInput!): Client
    updateUser(id: ID!, input: UserInput!): Client
    deleteUser(input: IdInput!): Client
  }
`

const models = `
  type User {
    id: ID
    name: String
    territory: String
    phone: String
    login: String
    password: String
  }
`

const inputs = `
  input UserInput {
    name: String
    territory: String
    phone: String
    login: String
    password: String
  }

  input IdInput {
    id: ID!
  }

`

const typeDefs = query + mutation + models + inputs
export default makeExecutableSchema({ typeDefs, resolvers })
