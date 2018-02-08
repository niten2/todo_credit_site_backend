const query = `
  query user($id: ID!) {
    user(id: $id) {
      ${matchers.user_attr}
    }
  }
`

describe("valid params given", () => {

  it('should return user', async () => {
    let user = await factory.create('userManager')

    const variableValues = {
      id: user.id
    }

    const res = await execGraphql({ query, variableValues, user })

    expect(res.data.user).toEqual(matchers.user_json)
  })

})

describe("wrong params given", () => {

  it('should return error', async () => {
    const variableValues = {
      id: "string"
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json)
  })

})

describe("unauthorized", () => {
  let res

  beforeEach(async () => {
    let user = await factory.create('userManager')

    const variableValues = {
      id: user.id
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
