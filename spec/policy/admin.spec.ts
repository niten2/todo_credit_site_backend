import { User, Client } from "config/initialize/mongoose"
import Policy from 'app/policy'

describe("admin", () => {
  let user
  let ability

  beforeAll(async () => {
    user = await factory.create('userAdmin')
    ability = await Policy(user)
  })

  describe("User", () => {
    it("should can create users", async () => {
      const res = ability.can("create", User)
      expect(res).toBeTruthy()
    })

    it("should can update users", async () => {
      const res = ability.can("update", User)
      expect(res).toBeTruthy()
    })

    it("should can delete users", async () => {
      const res = ability.can("delete", User)
      expect(res).toBeTruthy()
    })
  }

  describe("Client", () => {
    it("should cannot create client", async () => {
      const res = ability.can("create", Client)
      expect(res).toBeFalsy()
    })

    it("should can delete client", async () => {
      const res = ability.can("delete", Client)
      expect(res).toBeTruthy()
    })

    it("should can update.territory Client", async () => {
      const res = ability.can("update.territory", Client)
      expect(res).toBeTruthy()
    })
  }

})
