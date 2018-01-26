describe("valid params given", () => {

  it('should return user', async () => {
    let user = await factory.create('user')

    const query = `
      query user($id: String!) {
        user(id: $id) {
          name
          email
        }
      }
    `
    const variableValues = {
      id: user.id
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.data.user).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
      }),
    )
  })

})

describe("wrong params given", () => {

  it('should return error', async () => {
    const query = `
      query user($id: String!) {
        user(id: $id) {
          name
          email
        }
      }
    `
    const variableValues = {
      id: "string"
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors[0]).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        locations: expect.any(Array),
        path: expect.any(Array),
      }),
    )
  })

})
