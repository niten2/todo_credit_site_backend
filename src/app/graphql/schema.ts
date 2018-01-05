import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const query = `
  type Query {
    users: [User]
    user: User
  }
`

const mutation = `
  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(input: IdInput!): User
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
