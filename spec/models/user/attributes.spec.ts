import { User } from "config/initialize/mongoose"
import factory from "factory"

describe("attributes", () => {
  it("should have attributes", async () => {
    let user = await factory.create('user')
    let currentUser = await User.findById(user.id)

    expect(currentUser.name).toBe(user.name)
    expect(currentUser.email).toBe(user.email)
  })
})
