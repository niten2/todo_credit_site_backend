import { User } from "config/initialize/mongoose"
import Policy from 'app/policy'

describe("admin", () => {
  let user
  let ability

  beforeAll(async () => {
    user = await factory.create('userAdmin')
    ability = await Policy(user)
  })

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

})





// expect(await user.comparePassword(other_string)).toBeFalsy()
