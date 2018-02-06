import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const query = `
  type Query {
    users: [User]
    user(id: ID): User
    me: User

    clients(id: ID): [Client]
    client(id: ID): Client

    territories: [Territory]
  }
`

const mutation = `
  type Mutation {
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    deleteUser(input: IdInput!): User

    updateMe(input: MeUpdateInput!): User

    createClient(input: ClientCreateInput!): Client
    updateClient(input: ClientUpdateInput!): Client
    deleteClient(input: IdInput!): Client

    createToken(input: TokenCreateInput!): Token

    createLoan(input: LoanCreateInput!): Loan
    updateLoan(input: LoanUpdateInput!): Loan
    caclulateLoan(input: LoanCreateInput!): Total
  }
`

const models = `
  type User {
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

  type Client {
    id: ID
    full_name: String
    email: String
    passport: String
    phone: String
    territory: String
    user: String
    mark_as_deleted: Boolean
    total_sum_loans: Int

    loans: [Loan]

    createdAt: String
    updatedAt: String
  }

  type Token {
    token: String!
    user: User
  }

  type Loan {
    id: ID!
    date_start: String!
    date_end: String!
    client: String!
    sum: Int!

    createdAt: String
    updatedAt: String
  }

  type Territory {
    id: ID!
    name: String!
    rate: Int!

    createdAt: String
    updatedAt: String
  }

  type Total {
    total: Int!
  }
`

const inputs = `
  input IdInput {
    id: ID!
  }

  input UserCreateInput {
    full_name: String!
    email: String!
    login: String!
    password: String!
    role: String
    phone: String!
    territory: String
    createdAt: String
    updatedAt: String
  }

  input UserUpdateInput {
    id: ID!
    full_name: String
    email: String
    login: String
    password: String
    role: String
    phone: String
    territory: String
  }

  input MeUpdateInput {
    full_name: String
    email: String
    login: String
    password: String
    role: String
    phone: String
    territory: String
  }

  input ClientCreateInput {
    full_name: String!
    passport: String!
    phone: String!
    email: String
  }

  input ClientUpdateInput {
    id: ID!
    full_name: String
    email: String
    passport: String
    phone: String
    territory: String
    user: String
  }

  input TokenCreateInput {
    login: String!
    password: String!
  }

  input LoanCreateInput {
    sum: Int!
    date_start: String!
    date_end: String!
    client: String!
  }

  input LoanUpdateInput {
    id: ID!
    sum: Int
    date_start: String
    date_end: String
    client: String
  }
`

const typeDefs = query + mutation + models + inputs

export default makeExecutableSchema({ typeDefs, resolvers })
