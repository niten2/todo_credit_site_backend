import { Client } from "config/mongoose"

const query = `
  mutation updateClient($input: ClientUpdateInput!) {
    updateClient(input: $input) {
      ${matchers.client_attr}
    }
  }
`

describe("valid params given", () => {

  describe("user manager", () => {
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
      expect(res.data.updateClient).toEqual(matchers.client_json)
    })

    it('should update client', async () => {
      expect(client.full_name).toEqual(full_name)
    })
  })

  describe("user admin", () => {
    let res
    let client
    let user
    let territory
    const full_name = "new_name"

    beforeEach(async () => {
      user = await factory.create('userAdmin')
      client = await factory.create('client')
      territory = await factory.create('territory')

      const variableValues = {
        input: {
          id: client.id,
          territory: territory.id,
        }
      }

      res = await execGraphql({ query, variableValues, user })
      client = await Client.findById(client.id)
    })

    it('should change territory', async () => {
      expect(res.data.updateClient.territory.id).toEqual(territory.id)
    })

    it('should update client', async () => {
      expect(client.territory).toEqual(territory._id)
    })
  })

})

describe("wrong params given", () => {

  describe("userManager", () => {
    const full_name = "new_name"
    let res
    let client
    let user
    let territory

    beforeEach(async () => {
      user = await factory.create('userManager')
      client = await factory.create('client')
      territory = await factory.create('territory')

      const variableValues = {
        input: {
          id: client.id,
          full_name: full_name,
          territory: territory.id
        }
      }

      res = await execGraphql({ query, variableValues, user })
      client = await Client.findById(client.id)
    })

    it('should not change territory, should return error response', async () => {
      expect(res.errors).toContainEqual(matchers.errors_json)
    })

    it('should not change territory, should not update client', async () => {
      expect(client.territory).not.toEqual(territory.id)
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

      expect(res.errors).toContainEqual(matchers.errors_json)
    })
  })

})

describe("unauthorized", () => {
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

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
