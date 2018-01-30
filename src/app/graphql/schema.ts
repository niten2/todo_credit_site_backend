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

    createToken(input: TokenCreateInput!): Token

    createLoan(input: LoanCreateInput!): Loan
  }
`

const models = `
  type User {
    id: ID

    full_name: String!
    email: String
    login: String!
    password: String!
    role: String
    phone: String!
    territory: String!
    createdAt: String
    updatedAt: String
  }

  type Client {
    id: ID
    full_name: String
    email: String
    passport: String
    phone: String
    territory: String
    user: String
    mark_as_deleted: Boolean

    loans: [Loan]

    createdAt: String
    updatedAt: String
  }

  type Token {
    id: ID!
    email: String!
    value: String!
  }

  type Loan {
    id: ID!
    date_start: String!
    date_end: String!
    client: String!

    createdAt: String
    updatedAt: String
  }
`

const inputs = `
  input IdInput {
    id: ID!
  }

  input UserCreateInput {
    full_name: String!
    email: String
    login: String!
    password: String!
    role: String
    phone: String!
    territory: String!
    createdAt: String
    updatedAt: String
  }

  input UserUpdateInput {
    id: ID
    full_name: String
    email: String
    login: String
    password: String
    role: String
    phone: String
    territory: String
    createdAt: String
    updatedAt: String
  }

  input ClientCreateInput {
    full_name: String!
    passport: String!
    phone: String!
    territory: String
    email: String
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

  input TokenCreateInput {
    email: String!
    password: String!
  }

  input LoanCreateInput {
    date_start: String!
    date_end: String!
    client: String!
  }
`

const typeDefs = query + mutation + models + inputs

export default makeExecutableSchema({ typeDefs, resolvers })
