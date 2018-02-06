import { User } from "config/initialize/mongoose"

describe("attributes", () => {
  it("should have attributes", async () => {
    let user = await factory.create('user')

    expect(user).toEqual(matchers.user_db())
  })

  it("should have attributes", async () => {
    let user = await factory.create('user', { email: "my-test-mail@company.info" })

    expect(user).toEqual(matchers.user_db())
  })
})
