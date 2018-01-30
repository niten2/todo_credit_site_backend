import { Client } from "config/initialize/mongoose"

const query = `
  mutation createClient($input: ClientCreateInput!) {
    createClient(input: $input) {
      full_name
      email
    }
  }
`

describe("valid params given", () => {
  let res
  let client
  const password = "password"

  beforeEach(async () => {
    let user = await factory.create('userManager')
    client = await factory.build('client')

    const variableValues = {
      input: {
        full_name: client.full_name,
        email: client.email,
      }
    }

    res = await execGraphql({ query, variableValues, user })
  })

  it('should return valid response', async () => {
    expect(res.data.createClient).toEqual(matchers.client_json(client))
  })

  it('should create user', async () => {
    client = await Client.findOne({ full_name: client.full_name })

    expect(client).toEqual(expect.objectContaining({
      _id: expect.any(Object),

      full_name: client.full_name,
      email: client.email,
    })
  })
})

describe("wrong params given", () => {
  it('manager should not create client', async () => {
    let user = await factory.create('userAdmin')
    let client = await factory.build('client')

    const variableValues = {
      input: {
        full_name: client.full_name,
        email: client.email,
      }
    }

    let res = await execGraphql({ query, variableValues, user })

    expect(res.errors).toContainEqual(expect.objectContaining({
      message: 'Cannot execute "create" on "Client"',
    })
  })

  it('should return error', async () => {
    const variableValues = {
      input: {}
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})
