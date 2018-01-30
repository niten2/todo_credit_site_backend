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
  describe("userManager", () => {
    let res
    let client
    let user
    const full_name = "new_name"

    beforeEach(async () => {
      user = await factory.create('userManager')
      client = await factory.create('client')

      const variableValues = {
        input: {
          id: client.id,
          full_name: full_name,
        }
      }

      res = await execGraphql({ query, variableValues, user })
      client = await Client.findById(client.id)
    })

    it('should return valid response', async () => {
      expect(res.data.updateClient).toEqual(matchers.client_json(client))
    })

    it('should update client', async () => {
      expect(client.full_name).toEqual(full_name)
    })
  })
})

describe("wrong params given", () => {

  describe("user admin", () => {
    let res
    let client
    let user
    const full_name = "new_name"

    beforeEach(async () => {
      user = await factory.create('userAdmin')
      client = await factory.create('client')

      const variableValues = {
        input: {
          id: client.id,
          full_name: full_name,
        }
      }

      res = await execGraphql({ query, variableValues, user })
      client = await Client.findById(client.id)
    })

    it('should return valid response', async () => {
      expect(res.errors).toContainEqual(matchers.errors_json())
    })

    it('should update client', async () => {
      expect(client.full_name).not.toEqual(full_name)
    })
  })

  describe("wrong id", () => {
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
})
