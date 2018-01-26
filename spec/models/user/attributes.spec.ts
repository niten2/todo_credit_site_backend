import { User } from "config/initialize/mongoose"

describe("attributes", () => {
  it("should have attributes", async () => {
    let user = await factory.create('user')
    let currentUser = await User.findById(user.id)

    expect(currentUser).toEqual(
      expect.objectContaining({
        _id: expect.any(Object),
        name: user.name,
        email: user.email,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    )
  })
})
