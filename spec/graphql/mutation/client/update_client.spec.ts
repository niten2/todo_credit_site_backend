import { Client } from "config/initialize/mongoose"

const query = `
  mutation updateClient($input: ClientUpdateInput!) {
    updateClient(input: $input) {
      full_name
      email
    }
  }
`

describe("valid params given", () => {
  let res
  let client
  const full_name = "new_name"

  beforeEach(async () => {
    client = await factory.create('client')

    const variableValues = {
      input: {
        id: client.id,
        full_name: full_name,
      }
    }

    res = await execGraphql({ query, variableValues })
    client = await Client.findById(client.id)
  })

  it('should return valid response', async () => {
    expect(res.data.updateClient).toEqual(matchers.client_json(client))
  })

  it('should update client', async () => {
    expect(client.full_name).toEqual(full_name)
  })

})

describe("wrong params given", () => {
  it('should return error', async () => {
    const variableValues = {
      input: {
        id: "1234567"
        full_name: "full_name",
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})
