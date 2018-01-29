const query = `
  query user($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`

describe("valid params given", () => {

  it('should return user', async () => {
    let user = await factory.create('user')

    const variableValues = {
      id: user.id
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.data.user).toEqual(matchers.user_json(user))
  })

})

describe("wrong params given", () => {

  it('should return error', async () => {
    const variableValues = {
      id: "string"
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })

})
