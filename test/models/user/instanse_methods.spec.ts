import { User } from "config/mongoose"

describe("#comparepassword", () => {
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

describe("#addAttempt", () => {
  it("should add attempt", async () => {
    let user = await factory.create('user')

    await user.addAttempt()

    expect(user.attempt_login).toEqual(1)

    await user.addAttempt()

    expect(user.attempt_login).toEqual(2)

    await user.addAttempt()

    expect(user.attempt_login).toEqual(3)
  })

  it("should set blocked true", async () => {
    let user = await factory.create('user')

    await user.addAttempt()

    expect(user.blocked).toEqual(false)

    await user.addAttempt()

    expect(user.blocked).toEqual(false)

    await user.addAttempt()

    expect(user.blocked).toEqual(false)

    await user.addAttempt()

    expect(user.blocked).toEqual(true)
  })
})

describe("#resetAttempt", () => {
  it("should resetAttempt", async () => {
    let user = await factory.create('user', { attempt_login: 10 })

    expect(user.attempt_login).toEqual(10)

    await user.resetAttempt()

    expect(user.attempt_login).toEqual(0)
  })
})
