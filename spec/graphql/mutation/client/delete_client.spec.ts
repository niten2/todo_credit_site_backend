import { Client } from "config/initialize/mongoose"

const query = `
  mutation deleteClient($input: IdInput!) {
    deleteClient(input: $input) {
      ${matchers.client_attr()}
    }
  }
`

describe("valid params given", () => {
  let res
  let client
  const password = "password"

  beforeEach(async () => {
    client = await factory.create('client')

    const variableValues = {
      input: {
        id: client.id,
      }
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should return valid response', async () => {
    expect(res.data.deleteClient).toEqual(matchers.client_json(client))
  })

  it('should destroy client', async () => {
    client = await Client.findById(client.id)

    expect(client).toEqual(null)
  })
})

describe("wrong params given", () => {
  it('should return error', async () => {
    const variableValues = {
      input: {
        id: "1234567"
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})
