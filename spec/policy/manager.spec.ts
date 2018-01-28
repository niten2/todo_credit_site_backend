import { User, Client } from "config/initialize/mongoose"
import Policy from 'app/policy'

describe("manager", () => {
  let user
  let ability

  beforeAll(async () => {
    user = await factory.create('userManager')
    ability = await Policy(user)
  })

  it("should can create client", async () => {
    const res = ability.can("create", Client)

    expect(res).toBeTruthy()
  })

  it("should can update client", async () => {
    const res = ability.can("update", Client)

    expect(res).toBeTruthy()
  })

})
