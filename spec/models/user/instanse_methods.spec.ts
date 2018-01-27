import { User } from "config/initialize/mongoose"

describe("comparePassword", () => {
  it("should return true", async () => {
    const password = "password"
    let user = await factory.create('user', { password })

    expect(await user.comparePassword(password)).toBeTruthy()
  })

  it("should return false", async () => {
    const password = "password"
    const other_string = "other_string"
    let user = await factory.create('user', { password })

    expect(await user.comparePassword(other_string)).toBeFalsy()
  })
})
