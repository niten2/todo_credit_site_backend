import { Client } from "config/mongoose"

const query = `
  mutation createClient($input: ClientCreateInput!) {
    createClient(input: $input) {
      ${matchers.client_attr}
    }
  }
`

describe("valid params given", () => {
  let res
  let client
  let user
  const password = "password"

  beforeEach(async () => {
    user = await factory.create('userManager')
    client = await factory.build('client')

    const variableValues = {
      input: {
        full_name: client.full_name,
        email: client.email,
        passport: client.passport,
        phone: client.phone,
      }
    }

    res = await execGraphql({ query, variableValues, user })
  })

  it('should return valid response', async () => {
    expect(res.data.createClient.id).toBeType("string")
  })

  it('should create client', async () => {
    client = await Client.findOne({ full_name: client.full_name })

    expect(client).toEqual(expect.objectContaining({
      _id: expect.any(Object),

      full_name: client.full_name,
      email: client.email,
    })
  })

  it('should have territory user', async () => {
    client = await Client.findOne({ full_name: client.full_name })

    expect(client.territory).toEqual(user.territory)
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
        passport: client.passport,
        phone: client.phone,
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

    expect(res.errors).toContainEqual(matchers.errors_json)
  })
})

describe("unauthorized", () => {
  let res
  let client
  let user
  const password = "password"

  beforeEach(async () => {
    user = await factory.create('userManager')
    client = await factory.build('client')

    const variableValues = {
      input: {
        full_name: client.full_name,
        email: client.email,
        passport: client.passport,
        phone: client.phone,
      }
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
