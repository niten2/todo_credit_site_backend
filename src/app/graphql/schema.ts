import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const query = `
  type Query {
    users: [User]
    user(id: ID): User

    clients(id: ID): [Client]
    client(id: ID): Client
  }
`

const mutation = `
  type Mutation {
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    deleteUser(input: IdInput!): User

    createClient(input: ClientCreateInput!): Client
    updateClient(input: ClientUpdateInput!): Client
    deleteClient(input: IdInput!): Client

    createToken(input: TokenInput!): Token
  }
`

const models = `
  type User {
    id: ID
    name: String
    email: String
  }

  type Client {
    id: ID
    full_name: String
    email: String
    passport: String
    phone: String
    territory: String
    user: String
  }

  type Token {
    id: ID!
    email: String!
    value: String!
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

  input ClientCreateInput {
    id: ID
    full_name: String
    email: String
    passport: String
    phone: String
    territory: String
    user: String
  }

  input ClientUpdateInput {
    id: ID
    full_name: String
    email: String
    passport: String
    phone: String
    territory: String
    user: String
  }

  input IdInput {
    id: ID!
  }

  input TokenInput {
    email: String!
    password: String!
  }
`

const typeDefs = query + mutation + models + inputs

export default makeExecutableSchema({ typeDefs, resolvers })
