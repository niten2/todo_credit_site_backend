import { User } from "config/initialize/mongoose"

describe("password", () => {
  it("should bcrypt password", async () => {
    const password = "password"

    let user = await factory.create('user', { password })

    expect(user.password).not.toEqual(password)
  })
})
