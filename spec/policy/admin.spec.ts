import { User, Client, Loan } from "config/initialize/mongoose"
import Policy from 'app/policy'

describe("user admin", () => {
  let user
  let ability

  beforeAll(async () => {
    user = await factory.create('userAdmin')
    ability = await Policy(user)
  })

  it("should can", async () => {
    expect(ability.can('read', "User")).toBeTruthy()
    expect(ability.can("create", "User")).toBeTruthy()
    expect(ability.can('delete', "User")).toBeTruthy()

    expect(ability.can('read', "Client")).toBeTruthy()
    expect(ability.can('update', "Client")).toBeTruthy()
    expect(ability.can('update.territory', "Client")).toBeTruthy()
    expect(ability.can('delete', "Client")).toBeTruthy()

    expect(ability.can('update', "Loan")).toBeTruthy()
  })

  describe("update user", async () => {
    it("should can", async () => {
      let userManager = await factory.create('userManager')

      expect(ability.can('update', userManager)).toBeTruthy()
    })

    it("should can not", async () => {
      let userAdmin = await factory.create('userAdmin')

      expect(ability.can('update', userAdmin)).toBeFalsy()
    })
  })

})
